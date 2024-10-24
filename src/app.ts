import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import userRoutes from './routes/user-routes';
import propertyRoutes from './routes/property-routes';
import sessionMiddleware from './config/session'; // Import your session middleware
import connectDB from './db/mongodb'; // Import your MongoDB connection function

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend app
}));

app.use(express.json());

// Use session middleware
// app.use(sessionMiddleware);
// Routes
app.use('/api/companies', userRoutes);
app.use('/api/users', userRoutes); // Add user
app.use('/api/agents', userRoutes);
app.use('/api/users', userRoutes); // Login
app.use('/api/property', propertyRoutes);

// MongoDB connection
connectDB(); // Use the connectDB function

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
