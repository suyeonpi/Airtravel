import express from 'express';
import * as authController from '../controllers/authController.js';
import { checkId, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkid', checkId);

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/logout', verifyToken, authController.logout);

router.patch('/password', verifyToken, authController.updatePassword);

export default router;
