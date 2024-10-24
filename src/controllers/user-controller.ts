import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';

// Add User
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    jobTitle,
    firstName,
    lastName,
    companyName,
    phoneNumber,
    gender,
    username,
    email,
    password,
    companyEmail,
    userPermission,
    userRole,
    addedBy,
  } = req.body;

  try {
    // Check for existing user by email or username
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'Username or Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new UserModel({
      jobTitle,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      gender,
      username,
      email,
      password: hashedPassword,
      companyEmail,
      userPermission,
      userRole,
      addedBy,
    });

    // Save the user in the database
    const savedUser = await newUser.save();

    // Respond with the saved user data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        jobTitle: savedUser.jobTitle,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        username: savedUser.username,
        email: savedUser.email,
        userRole: savedUser.userRole,
        createdAt: savedUser.createdAt,  // Include createdAt timestamp
      },
    });
  } catch (error) {
    console.error('Error while registering user:', error);
    next(error); // Pass the error to the error handling middleware
  }
};



// Update User
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params; // Get user ID from URL parameters
  const updates = req.body; // Get the fields to update from the request body

  try {
    // Find the user by ID and update with the provided data
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...updates }, // Spread the updates into the object
      { new: true, runValidators: true } // Return the updated user & validate updates
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Send the updated user as a response (excluding password)
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        jobTitle: updatedUser.jobTitle,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        email: updatedUser.email,
        userRole: updatedUser.userRole,
        updatedAt: updatedUser.updatedAt, // Include updated timestamp
      },
    });
  } catch (error) {
    console.error('Error while updating user:', error);
    next(error); // Pass error to middleware
  }
};


// Get All Users with Pagination
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 25;
    const skip = (page - 1) * limit;

    // Ensure createdAt and updatedAt fields are not excluded
    const users = await UserModel.find({}, '-password') 
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for plain JavaScript objects

    const totalUsers = await UserModel.countDocuments();

    res.status(200).json({
      message: 'Users fetched successfully',
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error while fetching users:', error);
    next(error);
  }
};


// Get a Single User by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params; // Get user ID from URL parameters

  try {
    const user = await UserModel.findById(id, '-password'); // Exclude password field

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error('Error while fetching user:', error);
    next(error); // Pass the error to the error handling middleware
  }
};