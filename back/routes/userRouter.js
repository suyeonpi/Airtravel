import express from 'express';
import * as userController from '../controllers/userController.js';
import { checkId, verifyToken } from '../middleware/auth.js';
import { uploadUserPhoto } from '../middleware/multerS3.js';

const router = express.Router();

router.post('/checkid', checkId);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/myinfo', verifyToken, userController.getMe);

router.patch('/myinfo', verifyToken, uploadUserPhoto, userController.updateMe);

router.patch('/password', verifyToken, userController.updatePassword);

router.delete('/myinfo', verifyToken, userController.deleteMe);

export default router;
