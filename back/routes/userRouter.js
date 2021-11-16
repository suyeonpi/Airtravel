import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.route('/signup', userController.signup);

router.route('/login', userController.login);

router.route('/me', userController.me);

export default router;
