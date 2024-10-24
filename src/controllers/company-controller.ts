import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import Company from '../models/company';

// Company Registration
export const registerCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { companyName, email, password, addressLine1, area, city, postCode, website, phoneNumber, userType } = req.body;

  try {
    // Check for existing company by email
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company object
    const newCompany = new Company({
      companyName,
      email,
      password: hashedPassword,
      addressLine1,
      area,
      city,
      postCode,
      website,
      phoneNumber,
      userType,
    });

    // Save the company in the database
    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully', company: newCompany });
  } catch (error) {
    console.error('Error while registering company:', error);
    next(error); // Pass the error to the error handling middleware
  }
};
