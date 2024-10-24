// src/routes/propertyRoutes.ts
import express from 'express';
import { addProperty, getProperties } from '../controllers/property-controller';
import { authenticate } from '../middlewares/auth-middleware'; // Use this if authentication is required

const router = express.Router();

// Private route to add property
router.post('/add', authenticate, addProperty); // If authentication is not required, remove 'authenticate'

// Private route to get all properties
router.get('/properties', authenticate, getProperties); // Add authenticate middleware to this route

export default router;
