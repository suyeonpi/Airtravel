import * as commentRepository from '../models/commentModel.js';
import * as cardRepository from '../models/cardModel.js';
import AppError from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }

  const { page } = req.query;
  const comments = await (page
    ? commentRepository.getSome(card.id, page)
    : commentRepository.getAll(card.id));

  res.status(200).json({
    comments,
  });
});

export const createComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }
  const { text } = req.body;
  const newComment = await commentRepository.create(text, req.userId, card.id);

  res.status(201).json({
    comment: newComment,
  });
});

export const updateComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await commentRepository.getById(id);
  if (!comment) {
    return next(new AppError('해당 댓글을 찾을 수 없습니다', 404));
  }
  const card = await cardRepository.getById(comment.cardId);
  if (!card) {
    return next(new AppError('해당 게시글을 찾을 수 없습니다', 404));
  }
  if (comment.userId.id !== req.userId) {
    return next(new AppError('권한이 없습니다', 403));
  }
  const { text } = req.body;
  const updatedComment = await commentRepository.update(id, text);

  res.status(200).json({
    comment: updatedComment,
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await commentRepository.getById(id);
  if (!comment) {
    return next(new AppError('해당 댓글을 찾을 수 없습니다', 404));
  }
  const card = await cardRepository.getById(comment.cardId);
  if (!card) {
    return next(new AppError('해당 게시글을 찾을 수 없습니다', 404));
  }
  if (comment.userId.id !== req.userId) {
    return next(new AppError('권한이 없습니다', 403));
  }
  await await commentRepository.remove(id);

  res.status(204).json({
    comment: null,
  });
});
