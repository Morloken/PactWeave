import mongoose from 'mongoose';

export type CustomFieldType = 'text' | 'number' | 'date' | 'boolean' | 'currency';

export interface ICustomField {
  fieldId: string;
  name: string;
  type: CustomFieldType;
  value: unknown;
  isRequired: boolean;
}

export type PactStatus = 'Draft' | 'Pending' | 'Signed' | 'Disputed' | 'Resolved' | 'Cancelled';

export interface IPact {
  _id: mongoose.Types.ObjectId;
  initiatorId: mongoose.Types.ObjectId;
  counterpartyId: mongoose.Types.ObjectId | null;
  title: string;
  status: PactStatus;
  customFields: ICustomField[];
  inviteToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: Date | null;
}
