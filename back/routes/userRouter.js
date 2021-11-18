import express from 'express';
import * as userController from '../controllers/userController.js';
import { checkId, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkid', checkId);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/getMe', verifyToken, userController.getMe);

router.patch('/updateMe', verifyToken, userController.updateMe);

router.patch('/updatePW', verifyToken, userController.updatePassword);

router.delete('/deleteMe', verifyToken, userController.deleteMe);

export default router;
