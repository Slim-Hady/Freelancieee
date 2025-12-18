import express from 'express';
import { createUser, getUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);

export default router;
