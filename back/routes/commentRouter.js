import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/:id') // 카드 id
  .get(verifyToken, commentController.getAllComments)
  .post(verifyToken, commentController.createComment);

router
  .route('/:id') // 댓글 id
  .patch(verifyToken, commentController.updateComment)
  .delete(verifyToken, commentController.deleteComment);

export default router;
