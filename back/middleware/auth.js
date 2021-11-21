import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../models/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import { promisify } from 'util';

export const verifyToken = catchAsync(async (req, res, next) => {
  // const authHeader = req.get('Authorization');
  // if (!(authHeader && authHeader.startsWith('Bearer '))) {
  //   return next(new AppError('로그인을 먼저 해주세요', 401));
  // }
  // const token = authHeader.split(' ')[1];
  const token = req.cookies['token'];
  if (!token) {
    return next(new AppError('로그인을 먼저 해주세요', 401));
  }
  const decoded = await promisify(jwt.verify)(token, config.jwt.secretKey);

  const currentUser = await userRepository.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('회원 정보가 없습니다', 401));
  }

  req.userId = currentUser.id;
  req.token = token;
  next();
});

export const checkId = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  const found = await userRepository.findByUsername(username);
  const deactivedUser = await userRepository.findDeactivedId(username);
  if (found || deactivedUser) {
    return next(new AppError('해당 아이디가 이미 존재합니다', 409));
  }
  res.status(200).json({
    status: 'success',
    message: '해당 아이디를 사용할 수 있습니다',
  });
});
