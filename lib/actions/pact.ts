'use server';

import { auth } from '@/auth';
import { supabase, CustomField, Pact } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import crypto from 'crypto';

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

const UpdatePactSchema = z.object({
  pactId: z.string(),
  title: z.string().min(1).max(200).optional(),
  customFields: z.array(CustomFieldSchema).optional(),
});

type CreatePactInput = z.infer<typeof CreatePactSchema>;
type UpdatePactInput = z.infer<typeof UpdatePactSchema>;

async function verifySession() {
  const session = await auth();
  if (!session || !(session.user as { id?: string })?.id) {
    throw new Error('Unauthorized');
  }
  return session as unknown as { user: { id: string; email?: string; name?: string; image?: string } };
}

async function verifyPactAccess(pactId: string, userId: string): Promise<Pact> {
  const { data: pact, error } = await supabase
    .from('pacts')
    .select('*')
    .eq('id', pactId)
    .single();

  if (error || !pact) {
    throw new Error('Pact not found');
  }

  if (pact.initiator_id !== userId && pact.counterparty_id !== userId) {
    throw new Error('Forbidden');
  }

  return pact;
}

function sanitizePact(pact: Pact) {
  return {
    _id: pact.id,
    initiatorId: pact.initiator_id,
    counterpartyId: pact.counterparty_id,
    title: pact.title,
    status: pact.status,
    customFields: pact.custom_fields as CustomField[],
    createdAt: pact.created_at,
    updatedAt: pact.updated_at,
  };
}

export async function createPact(formData: CreatePactInput) {
  const session = await verifySession();
  
  const validated = CreatePactSchema.parse(formData);

  const { data: pact, error } = await supabase
    .from('pacts')
    .insert({
      initiator_id: session.user.id,
      title: validated.title,
      status: 'Draft',
      custom_fields: validated.customFields,
      counterparty_id: null,
      invite_token: null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating pact:', error);
    throw new Error('Failed to create pact');
  }

  revalidatePath('/pacts');
  return { success: true, pactId: pact.id };
}

export async function updatePact(formData: UpdatePactInput) {
  const session = await verifySession();
  
  const validated = UpdatePactSchema.parse(formData);

  const pact = await verifyPactAccess(validated.pactId, session.user.id);

  if (pact.status === 'Signed' || pact.status === 'Resolved' || pact.status === 'Cancelled') {
    throw new Error('Cannot modify signed, resolved or cancelled pacts');
  }

  if (pact.status !== 'Draft' && pact.initiator_id !== session.user.id) {
    throw new Error('Only initiator can edit in Draft status');
  }

  const updateData: Record<string, unknown> = {};
  if (validated.title) updateData.title = validated.title;
  if (validated.customFields) updateData.custom_fields = validated.customFields;

  const { error } = await supabase
    .from('pacts')
    .update(updateData)
    .eq('id', validated.pactId);

  if (error) {
    console.error('Error updating pact:', error);
    throw new Error('Failed to update pact');
  }

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${validated.pactId}`);
  return { success: true };
}

export async function sendPactInvite(pactId: string) {
  const session = await verifySession();
  
  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status !== 'Draft') {
    throw new Error('Can only invite from Draft status');
  }

  if (pact.initiator_id !== session.user.id) {
    throw new Error('Only initiator can send invites');
  }

  const inviteToken = crypto.randomBytes(32).toString('hex');

  const { error } = await supabase
    .from('pacts')
    .update({
      invite_token: inviteToken,
      status: 'Pending',
    })
    .eq('id', pactId);

  if (error) {
    console.error('Error sending invite:', error);
    throw new Error('Failed to send invite');
  }

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true, inviteToken };
}

export async function joinPact(pactId: string) {
  const session = await verifySession();
  
  const { data: pact, error: fetchError } = await supabase
    .from('pacts')
    .select('*')
    .eq('id', pactId)
    .single();

  if (fetchError || !pact) {
    throw new Error('Pact not found');
  }

  if (pact.counterparty_id) {
    throw new Error('Pact already has a counterparty');
  }

  if (pact.initiator_id === session.user.id) {
    throw new Error('Cannot join your own pact');
  }

  const { error } = await supabase
    .from('pacts')
    .update({
      counterparty_id: session.user.id,
      invite_token: null,
    })
    .eq('id', pactId);

  if (error) {
    console.error('Error joining pact:', error);
    throw new Error('Failed to join pact');
  }

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function signPact(pactId: string) {
  const session = await verifySession();
  
  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status !== 'Pending') {
    throw new Error('Can only sign pacts in Pending status');
  }

  const isCounterparty = pact.counterparty_id === session.user.id;
  if (!isCounterparty) {
    throw new Error('Only counterparty can sign the pact');
  }

  const { error } = await supabase
    .from('pacts')
    .update({ status: 'Signed' })
    .eq('id', pactId);

  if (error) {
    console.error('Error signing pact:', error);
    throw new Error('Failed to sign pact');
  }

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function cancelPact(pactId: string) {
  const session = await verifySession();
  
  const pact = await verifyPactAccess(pactId, session.user.id);

  if (pact.status === 'Signed' || pact.status === 'Resolved') {
    throw new Error('Cannot cancel signed or resolved pacts');
  }

  if (pact.status === 'Pending' && pact.initiator_id !== session.user.id) {
    throw new Error('Only initiator can cancel pending pacts');
  }

  const { error } = await supabase
    .from('pacts')
    .update({ status: 'Cancelled' })
    .eq('id', pactId);

  if (error) {
    console.error('Error cancelling pact:', error);
    throw new Error('Failed to cancel pact');
  }

  revalidatePath('/pacts');
  revalidatePath(`/pacts/${pactId}`);
  return { success: true };
}

export async function getPact(pactId: string) {
  const session = await verifySession();
  
  const pact = await verifyPactAccess(pactId, session.user.id);

  const { data: initiator } = await supabase
    .from('profiles')
    .select('name, image')
    .eq('id', pact.initiator_id)
    .single();

  let counterparty = null;
  if (pact.counterparty_id) {
    const { data } = await supabase
      .from('profiles')
      .select('name, image')
      .eq('id', pact.counterparty_id)
      .single();
    counterparty = data;
  }

  return {
    ...sanitizePact(pact),
    initiator: initiator ? { name: initiator.name, image: initiator.image } : null,
    counterparty: counterparty ? { name: counterparty.name, image: counterparty.image } : null,
  };
}

export async function getMyPacts() {
  const session = await verifySession();
  
  const { data: pacts, error } = await supabase
    .from('pacts')
    .select('id, title, status, created_at, updated_at')
    .or(`initiator_id.eq.${session.user.id},counterparty_id.eq.${session.user.id}`)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching pacts:', error);
    throw new Error('Failed to fetch pacts');
  }

  return pacts.map((pact: { id: string; title: string; status: string; created_at: string; updated_at: string }) => ({
    _id: pact.id,
    title: pact.title,
    status: pact.status,
    createdAt: pact.created_at,
    updatedAt: pact.updated_at,
  }));
}

export async function getPactByInviteToken(token: string) {
  const { data: pact, error } = await supabase
    .from('pacts')
    .select('id, title, status, initiator_id')
    .eq('invite_token', token)
    .single();

  if (error || !pact) {
    throw new Error('Pact not found or invite is invalid');
  }

  const { data: initiator } = await supabase
    .from('profiles')
    .select('name, image')
    .eq('id', pact.initiator_id)
    .single();

  return {
    _id: pact.id,
    title: pact.title,
    status: pact.status,
    initiator: initiator ? { name: initiator.name, image: initiator.image } : null,
  };
}
