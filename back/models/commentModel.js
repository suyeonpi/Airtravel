import Mongoose from 'mongoose';
import { createVirtualId } from '../db/database.js';

const commentSchema = new Mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, '글을 입력해주세요'],
    },
    userId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    cardId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Card',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toOBject: { virtuals: true },
  }
);

createVirtualId(commentSchema);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: 'usernick user_url',
  });
  next();
});

export const Comment = Mongoose.model('Comment', commentSchema);

export const getAllbyCard = async (cardId) => {
  return await Comment.find({ cardId });
};

export const getById = async (id) => {
  return await Comment.findById(id);
};

export const create = async (text, userId, cardId) => {
  return await new Comment({
    text,
    userId,
    cardId,
  }).save();
};

export const update = async (id, text) => {
  return await Comment.findByIdAndUpdate(
    id,
    { text },
    { returnOriginal: false }
  );
};

export const remove = async (id) => {
  return await Comment.findByIdAndDelete(id);
};
