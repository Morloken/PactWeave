'use server';

import { auth } from '@/auth';
import { connectDB, Pact, User } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import crypto from 'crypto';
import mongoose from 'mongoose';

const CustomFieldSchema = z.object({
  fieldId: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(['text', 'number', 'date', 'boolean', 'currency']),
  value: z.unknown().optional(),
  isRequired: z.boolean().default(false),
});

const CreatePactSchema = z.object({
  title: z.string().min(1).max(200),
  customFields: z.array(CustomFieldSchema).default([]),
});

type CreatePactInput = z.infer<typeof CreatePactSchema>;

const UpdatePactSchema = z.object({
  pactId: z.string(),
  title: z.string().min(1).max(200).optional(),
  customFields: z.array(CustomFieldSchema).optional(),
});

type UpdatePactInput = z.infer<typeof UpdatePactSchema>;

async function verifySession() {
  const session = await auth();
  if (!session || !(session.user as { id?: string })?.id) {
    throw new Error('Unauthorized');
  }
  return session as unknown as { user: { id: string } };
}

async function verifyPactAccess(pactId: string, userId: string) {
  const pact = await Pact.findById(pactId);
  if (!pact) {
    throw new Error('Pact not found');
  }
  const initiatorId = pact.initiatorId.toString();
  const counterpartyId = pact.counterpartyId?.toString();
  if (initiatorId !== userId && counterpartyId !== userId) {
    throw new Error('Forbidden');
  }
  return pact;
}

export async function createPact(formData: CreatePactInput) {
  const session = await verifySession();
  
  const validated = CreatePactSchema.parse(formData);

  await connectDB();

  const pact = await Pact.create({
    _id: new mongoose.Types.ObjectId(),
    initiatorId: new mongoose.Types.ObjectId(session.user.id),
    title: validated.title,
    status: 'Draft',
    customFields: validated.customFields,
    counterpartyId: null,
    inviteToken: null,
  });

  revalidatePath('/pacts');
  return { success: true, pactId: pact._id.toString() };
}

export async function updatePact(formData: UpdatePactInput) {
  const session = await verifySession();
  
  const validated = UpdatePactSchema.parse(formData);

  await connectDB();

  const pact = await verifyPactAccess(validated.pactId, session.user.id);

  if (pact.status === 'Signed' || pact.status === 'Resolved' || pact.status === 'Cancelled') {
    throw new Error('Cannot modify signed, resolved or cancelled pacts');
  }

  if (pact.status !== 'Draft' && session.user.id !== pact.initiatorId.toString()) {
    throw new Error('Only initiator can edit in Draft status');
  }

  const updateData: Record<string, unknown> = {};
  if (validated.title) updateData.title = validated.title;
  if (validated.customFields) updateData.customFields = validated.customFields;

  await Pact.findByIdAndUpdate(validated.pactId, { $set: updateData });

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${validated.pactId}`);
  return { success: true };
}

export async function sendPactInvite(pactId: string) {
  const session = await verifySession();
  
  await connectDB();

  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status !== 'Draft') {
    throw new Error('Can only invite from Draft status');
  }

  if (pact.initiatorId.toString() !== session.user.id) {
    throw new Error('Only initiator can send invites');
  }

  const inviteToken = crypto.randomBytes(32).toString('hex');

  await Pact.findByIdAndUpdate(pactId, {
    $set: {
      inviteToken,
      status: 'Pending',
    },
  });

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true, inviteToken };
}

export async function joinPact(pactId: string) {
  const session = await verifySession();
  
  await connectDB();

  const pact = await Pact.findById(pactId);
  if (!pact) {
    throw new Error('Pact not found');
  }

  if (pact.counterpartyId) {
    throw new Error('Pact already has a counterparty');
  }

  if (pact.initiatorId.toString() === session.user.id) {
    throw new Error('Cannot join your own pact');
  }

  const result = await Pact.findByIdAndUpdate(pactId, {
    $set: {
      counterpartyId: new mongoose.Types.ObjectId(session.user.id),
      inviteToken: null,
    },
  });

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function signPact(pactId: string) {
  const session = await verifySession();
  
  await connectDB();

  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status !== 'Pending') {
    throw new Error('Can only sign pacts in Pending status');
  }

  const isCounterparty = pact.counterpartyId?.toString() === session.user.id;
  if (!isCounterparty) {
    throw new Error('Only counterparty can sign the pact');
  }

  await Pact.findByIdAndUpdate(pactId, {
    $set: { status: 'Signed' },
  });

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function cancelPact(pactId: string) {
  const session = await verifySession();
  
  await connectDB();

  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status === 'Signed' || pact.status === 'Resolved') {
    throw new Error('Cannot cancel signed or resolved pacts');
  }

  if (pact.status === 'Pending' && pact.initiatorId.toString() !== session.user.id) {
    throw new Error('Only initiator can cancel pending pacts');
  }

  await Pact.findByIdAndUpdate(pactId, {
    $set: { status: 'Cancelled' },
  });

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function getPact(pactId: string) {
  const session = await verifySession();
  
  await connectDB();

  const pact = await verifyPactAccess(pactId, session.user.id);

  const sanitized = {
    _id: pact._id.toString(),
    initiatorId: pact.initiatorId.toString(),
    counterpartyId: pact.counterpartyId?.toString() || null,
    title: pact.title,
    status: pact.status,
    customFields: pact.customFields,
    createdAt: pact.createdAt,
    updatedAt: pact.updatedAt,
  };

  const initiator = await User.findById(pact.initiatorId).select('name image').lean();
  const counterparty = pact.counterpartyId 
    ? await User.findById(pact.counterpartyId).select('name image').lean()
    : null;

  return {
    ...sanitized,
    initiator: initiator ? { name: initiator.name, image: initiator.image } : null,
    counterparty: counterparty ? { name: counterparty.name, image: counterparty.image } : null,
  };
}

export async function getMyPacts() {
  const session = await verifySession();
  
  await connectDB();

  const pacts = await Pact.find({
    $or: [
      { initiatorId: new mongoose.Types.ObjectId(session.user.id) },
      { counterpartyId: new mongoose.Types.ObjectId(session.user.id) },
    ],
  })
  .sort({ updatedAt: -1 })
  .lean();

  return pacts.map((pact) => ({
    _id: pact._id.toString(),
    title: pact.title,
    status: pact.status,
    createdAt: pact.createdAt,
    updatedAt: pact.updatedAt,
  }));
}

export async function getPactByInviteToken(token: string) {
  await connectDB();

  const pact = await Pact.findOne({ inviteToken: token }).lean();

  if (!pact) {
    throw new Error('Pact not found or invite is invalid');
  }

  const initiator = await User.findById(pact.initiatorId).select('name image').lean();

  return {
    _id: pact._id.toString(),
    title: pact.title,
    status: pact.status,
    initiator: initiator ? { name: initiator.name, image: initiator.image } : null,
  };
}
