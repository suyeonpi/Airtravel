import Mongoose from 'mongoose';
import { createVirtualId } from '../db/database.js';

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
  },
  { timestamps: true }
);

createVirtualId(cardSchema);

export const Card = Mongoose.model('Card', cardSchema);
