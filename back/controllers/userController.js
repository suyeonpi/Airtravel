import * as userRepository from '../models/userModel.js';
import {} from 'express-async-errors';
import { config } from '../config.js';

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

export const signup = async (req, res) => {
  const { username, usernick, password, passwordConfirm } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: '해당 아이디가 이미 존재 합니다.' });
  }
  const userId = await userRepository.createUser({
    username,
    usernick,
    password,
    passwordConfirm,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, usernick });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요' });
  }
  const user = await userRepository.findByUsername(username);
  if (!user || !(await user.correctPassword(password, user.password))) {
    res
      .status(401)
      .json({ message: '아이디 또는 비밀번호가 잘못 입력 되었습니다.' });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ token });
};

export const me = async (req, res) => {};
