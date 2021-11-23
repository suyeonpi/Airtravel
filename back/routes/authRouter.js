import express from 'express';
import * as authController from '../controllers/authController.js';
import { checkId, verifyToken } from '../middleware/auth.js';
import {
  validateUsername,
  validateSignup,
  validatePassword,
  validateCredential,
} from '../middleware/validator.js';

const router = express.Router();

router.post('/checkid', validateUsername, checkId);

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.post('/logout', verifyToken, authController.logout);

router.patch(
  '/password',
  verifyToken,
  validatePassword,
  authController.updatePassword
);

export default router;
