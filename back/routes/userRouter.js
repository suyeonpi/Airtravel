import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadUserPhoto } from '../middleware/multerS3.js';

const router = express.Router();

router
  .route('/') //
  .get(verifyToken, userController.getUser)
  .patch(verifyToken, uploadUserPhoto, userController.updateMe)
  .delete(verifyToken, userController.deleteMe);

export default router;
