import Mongoose from 'mongoose';
import { createVirtualId } from '../db/database.js';

const cardSchema = new Mongoose.Schema(
  {
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
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
    },
    heart: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toOBject: { virtuals: true },
  }
);

createVirtualId(cardSchema);

// Virtual Populate
cardSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'card',
  localField: '_id',
});

export const Card = Mongoose.model('Card', cardSchema);

export const getAll = async () => {
  return await Card.find().sort({ createdAt: -1 });
};

export const getAllByContinent = async (continent) => {
  return await Card.find({ continent }).sort({ createdAt: -1 });
};

export const getAllByUser = async (userId) => {
  return await Card.find({ userId }).sort({
    createdAt: -1,
  });
};

export const getById = async (id) => {
  return await Card.findById(id);
};

export const getDetail = async (id) => {
  return await Card.findById(id)
    .populate({
      path: 'userId',
      select: 'usernick user_url',
    })
    .populate({
      path: 'likes',
      select: '-__v',
    });
};

export const create = async (card, userId) => {
  return new Card({
    ...card,
    like_count: 0,
    userId,
  }).save();
};

export const update = async (id, card) => {
  return await Card.findByIdAndUpdate(
    id,
    { ...card, like_count: 0 },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const remove = async (id) => {
  return await Card.findByIdAndDelete(id);
};

export const updateLikeCount = async (id, count) => {
  return await Card.findByIdAndUpdate(
    id,
    {
      like_count: count,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};
