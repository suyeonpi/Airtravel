import Mongoose from 'mongoose';
import { createVirtualId } from '../db/database.js';
import * as userRepository from './userModel.js';

const cardSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요'],
      maxlength: [15, '제목은 15자 이하로 적어주세요'],
    },
    location: {
      type: String,
      required: [true, '위치를 입력해주세요'],
    },
    continent: {
      type: String,
      enum: {
        values: [
          '아시아',
          '유럽',
          '북아메리카',
          '남아메리카',
          '아프리카',
          '오세아니아',
        ],
        message: '대륙을 선택해주세요',
      },
    },
    date: {
      type: Date,
      required: [true, '날짜를 선택해주세요'],
    },
    content: {
      type: String,
      required: [true, '내용을 입력해주세요'],
    },
    picture_url: {
      type: String,
      required: [true, '사진을 첨부해주세요'],
    },
    like_count: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    usernick: {
      type: String,
      required: true,
    },
    user_url: String,
  },
  { timestamps: true }
);

createVirtualId(cardSchema);

export const Card = Mongoose.model('Card', cardSchema);

export const getAll = () => {
  return Card.find().sort({ createdAt: -1 });
};

export const getAllByContinent = (continent) => {
  return Card.find({ continent }).sort({ createdAt: -1 });
};

export const getAllByUser = (usernick) => {
  return Card.find({ usernick }).sort({ createdAt: -1 });
};

export const getById = (id) => {
  return Card.findById(id);
};

export const create = async (card, userId) => {
  const { usernick, user_url } = await userRepository.findById(userId);
  return new Card({
    ...card,
    like_count: 0,
    userId,
    usernick,
    user_url,
  }).save();
};

export const update = (id, card) => {
  return Card.findByIdAndUpdate(
    id,
    { ...card, like_count: 0 },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const remove = (id) => {
  return Card.findByIdAndDelete(id);
};
