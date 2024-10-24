import express from 'express';
import { 
  registerCompany 
} from '../controllers/company-controller';
import { 
  registerUser, updateUser, getAllUsers, getUserById 
} from '../controllers/user-controller';
import { authenticate } from '../middlewares/auth-middleware';
import { getAllAgents, getOneAgent, registerAgent, updateAgent } from '../controllers/agent-controller';
import { login } from '../controllers/login-controller';
import { logout } from '../controllers/auth-controller';

const router = express.Router();

// Public route for company registration
router.post('/register/company', registerCompany);

// Protected route for user registration (after login)
router.post('/register/user', authenticate, registerUser);
router.post('/register/agent', authenticate, registerAgent); // users/register/agent

// New protected route for updating user details
router.put('/update/user/:id', authenticate, updateUser); //PUT /update/user/:id 

// New protected route for fetching all users
router.get('/users', authenticate, getAllUsers); //GET /users?page=1

// New protected route for fetching a single user by ID
router.get('/user/:id', authenticate, getUserById); // /GET /user/:id

// Public route for agent registration
router.post('/register/agent', registerAgent);

// Public route for user login
router.post('/login', login);

// Protected route for user logout
router.post('/logout', authenticate, logout);

// Protected routes for agent operations
router.get('/agents', authenticate, getAllAgents);
router.get('/agents/:id', authenticate, getOneAgent);
router.put('/agents/:id', authenticate, updateAgent);

export default router;
