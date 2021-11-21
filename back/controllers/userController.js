import * as userRepository from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import { config } from '../config.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getMe = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  const { usernick, user_url, back_url } = user;

  res.status(200).json({
    usernick,
    user_url,
    back_url,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  if (req.files.user_url)
    req.body.user_url = req.files.user_url[0].transforms[0].location;
  if (req.files.back_url)
    req.body.back_url = req.files.back_url[0].transforms[0].location;

  const { usernick, user_url, back_url } = req.body;
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
