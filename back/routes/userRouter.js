import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/checkme', verifyToken, userController.checkme);

export default router;
