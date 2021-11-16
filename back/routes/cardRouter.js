import express from 'express';
import * as cardController from '../controllers/cardController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router //
  .route('/')
  .get(cardController.getCards)
  .get(verifyToken, cardController.getCardsByUser)
  .post(verifyToken, cardController.createCard);

router //
  .route('/:id')
  .get(verifyToken, cardController.getCard)
  .put(verifyToken, cardController.updateCard)
  .delete(verifyToken, cardController.deleteCard);

export default router;
