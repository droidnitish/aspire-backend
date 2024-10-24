// src/controllers/authController.ts
import { Request, Response } from 'express';

export const logout = (req: Request, res: Response): void => {
    // Destroy the session associated with the request
    req.session.destroy((err) => {
        if (err) {
            console.error('Error while logging out:', err);
            return res.status(500).json({ message: 'Could not log out, please try again.' });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid'); // 'connect.sid' is the default cookie name for express-session
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
