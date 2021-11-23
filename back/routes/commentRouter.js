import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateParam } from '../middleware/validator.js';

const router = express.Router();

router
  .route('/:id') // 카드 id
  .get(validateParam, verifyToken, commentController.getComments)
  .post(validateParam, verifyToken, commentController.createComment);

router
  .route('/:id') // 댓글 id
  .patch(validateParam, verifyToken, commentController.updateComment)
  .delete(validateParam, verifyToken, commentController.deleteComment);

export default router;
