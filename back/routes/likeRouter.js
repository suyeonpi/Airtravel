import express from 'express';
import * as likeController from '../controllers/likeController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router //
  .route('/')
  .get(verifyToken, likeController.getAllLike);

router //
  .route('/:id')
  .post(verifyToken, likeController.addLike)
  .delete(verifyToken, likeController.removeLike);

export default router;
