import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateParam } from '../middleware/validator.js';

const router = express.Router();

router
  .route('/:id') // ์นด๋ id
  .get(validateParam, verifyToken, commentController.getComments)
  .post(validateParam, verifyToken, commentController.createComment);

router
  .route('/:id') // ๋๊ธ id
  .patch(validateParam, verifyToken, commentController.updateComment)
  .delete(validateParam, verifyToken, commentController.deleteComment);

export default router;
