import * as cardRepository from '../models/cardModel.js';
import AppError from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getCards = catchAsync(async (req, res, next) => {
  const { continent } = req.query;
  const cards = await (continent
    ? cardRepository.getAllByContinent(continent)
    : cardRepository.getAll());

  res.status(200).json({
    status: 'success',
    result: cards.length,
    data: {
      cards,
    },
  });
});

export const getCardsByUser = catchAsync(async (req, res, next) => {
  const { usernick } = req.query;
  const cards = await cardRepository.getAllByUser(usernick);

  res.status(200).json({
    status: 'success',
    result: cards.length,
    data: {
      cards,
    },
  });
});

export const getCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      card,
    },
  });
});

export const createCard = catchAsync(async (req, res, next) => {
  const newCard = await cardRepository.create(req.body, req.userId);

  res.status(201).json({
    status: 'success',
    data: {
      card: newCard,
    },
  });
});

export const updateCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }
  if (card.userId !== req.userId) {
    return next(new AppError('권한이 없습니다', 403));
  }
  const newCard = await cardRepository.update(id, req.body);

  res.status(201).json({
    status: 'success',
    data: {
      card: newCard,
    },
  });
});

export const deleteCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }
  if (card.userId !== req.userId) {
    return next(new AppError('권한이 없습니다', 403));
  }
  await cardRepository.remove(id);

  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
});
