import * as userRepository from '../models/userModel.js';
import {} from 'express-async-errors';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getUser = catchAsync(async (req, res, next) => {
  let { usernick } = req.query;
  let user;

  if (usernick) {
    usernick = decodeURIComponent(usernick);
    if (await userRepository.findDeactivedNick(usernick)) {
      return next(new AppError('비활성화된 계정입니다', 403));
    }
    user = await userRepository.findByUsernick(usernick);
  } else {
    user = await userRepository.findById(req.userId);
  }

  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }

  const { user_url, back_url } = user;

  res.status(200).json({
    usernick: user.usernick,
    user_url,
    back_url,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  if (req.files && req.files.user_url)
    req.body.user_url = req.files.user_url[0].transforms[0].location;
  if (req.files && req.files.back_url)
    req.body.back_url = req.files.back_url[0].transforms[0].location;

  const { usernick, user_url, back_url } = req.body;

  if (usernick) {
    const foundNick = await userRepository.findByUsernick(usernick);
    const deactivedNick = await userRepository.findByUsernick(usernick);
    if (foundNick || deactivedNick) {
      return next(new AppError('해당 닉네임이 이미 존재합니다', 409));
    }
  }

  const updatedUser = await userRepository.update(req.userId, {
    usernick,
    user_url,
    back_url,
  });

  res.status(200).json({
    user: updatedUser,
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  const { password } = req.body;
  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('비밀번호가 일치하지 않습니다', 401));
  }
  await userRepository.deactive(req.userId);

  res.status(204).json({
    user: null,
  });
});
