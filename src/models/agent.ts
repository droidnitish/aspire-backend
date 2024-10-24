// src/models/agent.ts
import mongoose, { Schema, Document } from "mongoose";

interface IAgent extends Document {
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  addressLine1?: string;
  area?: string;
  city?: string;
  postCode?: string;
  website?: string; // Optional field
  phoneNumber: string;
  userPermission: string[]; // Array of strings for multiple permissions
  userRole: "agent"; // Type of user
  createdAt?: Date; // Optional, added automatically
  updatedAt?: Date; // Optional, added automatically
}

const AgentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  addressLine1: { type: String, required: false },
  area: { type: String, required: false },
  city: { type: String, required: false },
  postCode: { type: String, required: false },
  website: { type: String, required: false }, // Optional field
  phoneNumber: { type: String, required: true },
  userPermission: { type: [String], required: true }, // Array of strings for permissions
  userRole: { type: String, default: "Agent" },
},
{ timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the agent model
export default mongoose.model<IAgent>("Agent", AgentSchema);
