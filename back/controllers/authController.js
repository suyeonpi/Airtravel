import {} from 'express-async-errors';
import jwt from 'jsonwebtoken';
import * as userRepository from '../models/userModel.js';
import { config } from '../config.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

const setCookie = (res, token) => {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options);
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
  setCookie(res, token);

  res.status(201).json({
    token,
    userId,
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
    token,
    usernick: user.usernick,
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
  setCookie(res, newToken);

  res.status(200).json({
    message: '비밀번호가 변경되었습니다',
    usernick: newUser.usernick,
  });
});

export const logout = (req, res, next) => {
  res.cookie('token', '');
  res.status(200).json({
    message: '로그아웃 되었습니다',
  });
};
