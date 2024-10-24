// src/types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // or whatever type you use for the user ID
                // Add any other properties you want to add to the user object here
            };
        }
    }
}
