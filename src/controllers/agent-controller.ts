// src/controllers/agentController.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Agent from '../models/agent'; // Agent model import

// Agent registration controller
export const registerAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, companyName, email, password, addressLine1, area, city, postCode, website, phoneNumber, userPermission, userRole } = req.body;
  
    try {
      const existingAgent = await Agent.findOne({ email });
      if (existingAgent) {
        res.status(400).json({ message: 'Agent with this email already exists' });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newAgent = new Agent({
        firstName,
        lastName,
        companyName,
        email,
        password: hashedPassword,
        addressLine1,
        area,
        city,
        postCode,
        website,
        phoneNumber,
        userPermission,
        userRole,
      });
  
      await newAgent.save();
      res.status(201).json({ message: 'Agent registered successfully', agent: newAgent });
    } catch (error) {
      console.error('Error while registering agent:', error);
      next(error);
    }
  };
  
  // Get All Agents with Pagination
export const getAllAgents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    const agents = await Agent.find({}, '-password')
      .skip(skip)
      .limit(limit)
      .lean();

    const totalAgents = await Agent.countDocuments();

    res.status(200).json({
      message: 'Agents fetched successfully',
      agents,
      totalAgents,
      totalPages: Math.ceil(totalAgents / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error while fetching agents:', error);
    next(error);
  }
};

// Get One Agent by ID
export const getOneAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const agent = await Agent.findById(id, '-password');
    if (!agent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }

    res.status(200).json({ message: 'Agent fetched successfully', agent });
  } catch (error) {
    console.error('Error while fetching agent:', error);
    next(error);
  }
};

// Update Agent by ID
export const updateAgent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    // Check if agent exists
    const agent = await Agent.findById(id);
    if (!agent) {
      res.status(404).json({ message: 'Agent not found' });
      return;
    }

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update agent details
    const updatedAgent = await Agent.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    res.status(200).json({ message: 'Agent updated successfully', agent: updatedAgent });
  } catch (error) {
    console.error('Error while updating agent:', error);
    next(error);
  }
};
