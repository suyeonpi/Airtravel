import * as likeRepository from '../models/likeModel.js';
import * as cardRepository from '../models/cardModel.js';

export const getAllLike = async (req, res, next) => {};

export const addLike = async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: '해당 카드를 찾을 수 없습니다.' });
  }
  await likeRepository.likeCard(id, req.userId);

  const like = card.like_count + 1;
  const newCard = await cardRepository.updateLike(id, like);
  res.status(201).json(newCard);
};

export const removeLike = async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return res.status(404).json({ message: '해당 카드를 찾을 수 없습니다.' });
  }
  await likeRepository.dislikeCard(id, req.userId);

  const dislike = card.like_count - 1;
  await cardRepository.updateLike(id, dislike);
  res.sendStatus(204);
};
