import { Schema, model } from 'mongoose';

interface Company {
  companyName: string;
  email: string;
  password: string; // Make sure to hash this before saving
  addressLine1: string;
  area: string;
  city: string;
  postCode: string;
  website: string;
  phoneNumber: string;
  userType: 'super admin' | 'admin' | 'staff' | 'agent';
}

const companySchema = new Schema<Company>({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addressLine1: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  postCode: { type: String, required: true },
  website: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, required: true, enum: ['super admin', 'admin', 'staff', 'agent'] },
});

const CompanyModel = model<Company>('Company', companySchema);

export default CompanyModel;
