import express from 'express';
import * as cardController from '../controllers/cardController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadCardPhoto } from '../middleware/multerS3.js';
import { validateParam } from '../middleware/validator.js';

const router = express.Router();

router //
  .route('/')
  .get(cardController.getCards)
  .post(verifyToken, uploadCardPhoto, cardController.createCard);

router.get('/user', verifyToken, cardController.getCardsByUser);

router //
  .route('/:id')
  .get(validateParam, verifyToken, cardController.getCard)
  .patch(validateParam, verifyToken, cardController.updateCard)
  .delete(validateParam, verifyToken, cardController.deleteCard);

export default router;
