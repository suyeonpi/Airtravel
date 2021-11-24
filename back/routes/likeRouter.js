import express from 'express';
import * as likeController from '../controllers/likeController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateParam } from '../middleware/validator.js';

const router = express.Router();

router //
  .route('/')
  .get(verifyToken, likeController.getAllLiked);

router //
  .route('/:id')
  .post(validateParam, verifyToken, likeController.addLike)
  .delete(validateParam, verifyToken, likeController.removeLike);

export default router;
