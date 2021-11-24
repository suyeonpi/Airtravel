import { body, param, validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0]['msg'] });
};

export const validateCard = [
  body('location').notEmpty().trim().withMessage('위치를 적어주세요'),
  body('continent').notEmpty().withMessage('대륙을 선택해주세요'),
  body('date').notEmpty().isDate().withMessage('날짜를 선택해주세요'),
  body('content').notEmpty().trim().withMessage('내용을 입력해주세요'),
  validate,
];

export const validateCredential = [
  body('password')
    .exists()
    .isLength({ min: 8 })
    .withMessage('비밀번호 최소 8자를 입력해주세요'),
  body('passwordConfirm')
    .exists()
    .isLength({ min: 8 })
    .custom((value, { req }) => value === req.body.password)
    .withMessage('비밀번호가 서로 다릅니다'),
  validate,
];

export const validatePassword = [
  body('currentPassword')
    .if((value, { req }) => req.body.password)
    .if(body('password').exists())
    .notEmpty()
    .custom((value, { req }) => value !== req.body.password)
    .withMessage('새 비밀번호를 다르게 설정해주세요'),
  ...validateCredential,
  validate,
];

export const validateUsername = [
  body('username')
    .notEmpty()
    .trim()
    .isLength({ min: 5 })
    .toLowerCase()
    .withMessage('아이디는 최소 5자 이상입니다'),
  validate,
];

export const validateSignup = [
  ...validateUsername,
  ...validateCredential,
  body('usernick').notEmpty().trim().withMessage('닉네임을 입력해주세요'),
  validate,
];

export const validateParam = [
  param('id').customSanitizer((value) => ObjectId(value)),
  validate,
];
