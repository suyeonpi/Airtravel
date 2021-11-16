import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: '로그인을 해주세요' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) return res.status(401).json({ message: '회원 정보가 없습니다' });

    const currentUser = await userRepository.findById(decoded.id);

    if (!currentUser)
      return res.status(401).json({ message: '회원 정보가 없습니다' });

    req.userId = currentUser.id;
    req.token = token;
    next();
  });
};
