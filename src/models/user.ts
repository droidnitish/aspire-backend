import { Schema, model } from 'mongoose';

interface User {
  jobTitle: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  username: string;
  email: string;
  password: string;
  companyEmail: string;
  userPermission: string[];
  userRole: 'super admin' | 'admin' | 'staff' | 'agent';
  addedBy: string;
  createdAt?: Date;  // Optional, added automatically
  updatedAt?: Date;  // Optional, added automatically
}

const userSchema = new Schema<User>(
  {
    jobTitle: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: { type: String },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyEmail: { type: String, required: true },
    userPermission: { type: [String] },
    userRole: { type: String, required: true, enum: ['super admin', 'admin', 'staff', 'agent'] },
    addedBy: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const UserModel = model<User>('User', userSchema);

export default UserModel;
