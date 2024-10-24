import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Company from '../models/company'; // Adjust the import based on your structure
import User from '../models/user';
import Agent from '../models/agent';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check in Company model
        const company = await Company.findOne({ email });
        if (company) {
            const isMatch = await bcrypt.compare(password, company.password);
            if (isMatch) {
                const token = jwt.sign({ id: company._id, userType: 'company' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                // Include additional company details if necessary
                res.status(200).json({ 
                    message: 'Login successful', 
                    token, 
                    user: { 
                        id: company._id,
                        email: company.email,
                        companyName: company.companyName
                    } 
                });
                return;
            }
        }

        // Check in User model
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id, userType: 'user' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                // Include user details
                res.status(200).json({ 
                    message: 'Login successful', 
                    token, 
                    user: { 
                        id: user._id,
                        firstName: user.firstName, // Assuming you have these fields
                        lastName: user.lastName,
                        email: user.email,
                        companyName: user.companyName,
                        username: user.username,
                         
                    } 
                });
                return;
            }
        }

        // Check in Agent model
        const agent = await Agent.findOne({ email });
        if (agent) {
            const isMatch = await bcrypt.compare(password, agent.password);
            if (isMatch) {
                const token = jwt.sign({ id: agent._id, userType: 'agent' }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
                // Include agent details
                res.status(200).json({ 
                    message: 'Login successful', 
                    token, 
                    user: { 
                        id: agent._id,
                        email: agent.email,
                        companyName: agent.companyName
                    } 
                });
                return;
            }
        }

        // If no match found
        res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during login:', error);
        next(error); // Pass error to the error handling middleware
    }
};
