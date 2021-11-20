import * as userRepository from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import { config } from '../config.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const { username, usernick, password, passwordConfirm } = req.body;

  const found = await userRepository.findByUsername(username);
  const deactivedUser = await userRepository.findDeactivedId(username);
  if (found || deactivedUser) {
    return next(new AppError('해당 아이디가 이미 존재합니다', 409));
  }

  const foundNick = await userRepository.findByUsernick(usernick);
  const deactivedNick = await userRepository.findByUsernick(usernick);
  if (foundNick || deactivedNick) {
    return next(new AppError('해당 닉네임이 이미 존재합니다', 409));
  }

  const userId = await userRepository.create({
    username,
    usernick,
    password,
    passwordConfirm,
  });
  const token = createJwtToken(userId);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      userId,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError('아이디와 비밀번호를 입력하세요', 400));
  }
  const user = await userRepository.findByUsername(username);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError('아이디 또는 비밀번호가 잘못 입력 되었습니다.', 401)
    );
  }
  const token = createJwtToken(user.id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      usernick: user.usernick,
    },
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  const { usernick, user_url, back_url } = user;

  res.status(200).json({
    status: 'success',
    token: req.token,
    data: {
      usernick,
      user_url,
      back_url,
    },
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
    status: 'success',
    data: {
      user: updatedUser,
    },
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
    status: 'success',
    data: {
      user: null,
    },
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return next(new AppError('회원 정보가 없습니다', 404));
  }
  const { currentPassword, password, passwordConfirm } = req.body;

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('비밀번호가 일치하지 않습니다', 401));
  }
  if (currentPassword === password) {
    return next(new AppError('같은 비밀번호는 사용할 수 없습니다', 401));
  }
  const newUser = await userRepository.updateUserPassword(
    req.userId,
    password,
    passwordConfirm
  );
  const newToken = createJwtToken(newUser.id);

  res.status(200).json({
    status: 'success',
    token: newToken,
    data: {
      usernick: newUser.usernick,
    },
  });
});
