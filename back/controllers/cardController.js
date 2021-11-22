import * as cardRepository from '../models/cardModel.js';
import * as userRepository from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getCards = catchAsync(async (req, res, next) => {
  let { continent } = req.query;
  if (continent) continent = decodeURIComponent(continent);
  const cards = await (continent
    ? cardRepository.getAllByContinent(continent)
    : cardRepository.getAll());

  res.status(200).json({
    cards,
  });
});

export const getCardsByUser = catchAsync(async (req, res, next) => {
  let { usernick } = req.query;
  if (usernick) usernick = decodeURIComponent(usernick);
  const deactivatedUser = await userRepository.findDeactivedNick(usernick);
  if (deactivatedUser) {
    return next(new AppError('비활성화된 계정입니다', 403));
  }
  const user = await userRepository.findByUsernick(usernick);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  const cards = await cardRepository.getAllByUser(user.id);

  res.status(200).json({
    cards,
  });
});

export const getCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getDetail(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }

  // 로그인한 사람이 해당 게시물 좋아했을 시? heart
  if (card.likes.find((like) => like.user.toString() === req.userId)) {
    card.heart = true;
  }
  card.likes = undefined;

  res.status(200).json({
    card: {
      id: card.id,
      location: card.location,
      continent: card.continent,
      date: card.date,
      content: card.content,
      picture_url: card.picture_url,
      like_count: card.like_count,
      heart: card.heart,
      userId: card.userId,
    },
  });
});

export const createCard = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('사진을 등록해 주십시오', 400));
  }
  req.body.picture_url = req.file.transforms[0].location;
  const newCard = await cardRepository.create(req.body, req.userId);

  res.status(201).json({
    card: newCard,
  });
});

export const updateCard = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const card = await cardRepository.getById(id);
  if (!card) {
    return next(new AppError('해당 카드를 찾을 수 없습니다', 404));
  }
  if (card.userId.toString() !== req.userId) {
    return next(new AppError('권한이 없습니다', 403));
  }
  const newCard = await cardRepository.update(id, req.body);

  res.status(201).json({
    card: newCard,
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
    message: '삭제 완료',
  });
});
