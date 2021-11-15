import express from 'express';
import * as cardController from '../controllers/cardController.js';

const router = express.Router();

router //
  .route('/')
  .get(cardController.getCards)
  .post(cardController.createCard);

router //
  .route('/:id')
  .get(cardController.getCard)
  .put(cardController.updateCard)
  .delete(cardController.deleteCard);

export default router;
