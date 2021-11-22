import * as likeRepository from '../models/likeModel.js';
import * as cardRepository from '../models/cardModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getAllLiked = catchAsync(async (req, res, next) => {
  const cards = await likeRepository.getAllCardsLiked(req.userId);
  res.status(200).json({
    cards,
  });
});

export const addLike = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }

  await likeRepository.likeCard(id, req.userId);

  const like = card.like_count + 1;
  const newCard = await cardRepository.updateLikeCount(id, like);

  res.status(201).json({
    card: newCard,
  });
});

export const removeLike = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }

  await likeRepository.dislikeCard(id, req.userId);

  const dislike = card.like_count - 1;
  await cardRepository.updateLikeCount(id, dislike);

  res.status(204).json({
    message: '좋아요 취소완료',
  });
});
