import mongoose, { Schema, Model } from 'mongoose';
import { IPact, PactStatus, ICustomField, CustomFieldType } from './types';

const CustomFieldSchema = new Schema<ICustomField>(
  {
    fieldId: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: ['text', 'number', 'date', 'boolean', 'currency'] as CustomFieldType[],
      required: true,
    },
    value: {
      type: Schema.Types.Mixed,
      default: null,
    },
    isRequired: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { _id: false }
);

const PactSchema = new Schema<IPact>(
  {
    initiatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    counterpartyId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: Schema.Types.String,
      enum: ['Draft', 'Pending', 'Signed', 'Disputed', 'Resolved', 'Cancelled'] as PactStatus[],
      default: 'Draft',
      index: true,
    },
    customFields: {
      type: [CustomFieldSchema],
      default: [],
    },
    inviteToken: {
      type: Schema.Types.String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

PactSchema.index({ initiatorId: 1, status: 1 });
PactSchema.index({ counterpartyId: 1, status: 1 });

const Pact: Model<IPact> = mongoose.models.Pact || mongoose.model<IPact>('Pact', PactSchema);

export default Pact;
export { CustomFieldSchema };
