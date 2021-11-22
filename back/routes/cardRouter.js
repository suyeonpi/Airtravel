import express from 'express';
import * as cardController from '../controllers/cardController.js';
import { verifyToken } from '../middleware/auth.js';
import { uploadCardPhoto } from '../middleware/multerS3.js';

const router = express.Router();

router //
  .route('/')
  .get(cardController.getCards)
  .get(verifyToken, cardController.getCardsByUser)
  .post(verifyToken, uploadCardPhoto, cardController.createCard);

router //
  .route('/:id')
  .get(verifyToken, cardController.getCard)
  .patch(verifyToken, cardController.updateCard)
  .delete(verifyToken, cardController.deleteCard);

export default router;
