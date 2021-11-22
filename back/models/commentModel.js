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

export const getAll = async (cardId) => {
  return await Comment.find({ cardId });
};

export const getSome = async (cardId, page) => {
  const skip = (page - 1) * 5;
  const numComment = await Comment.countDocuments({ cardId });
  if (skip >= numComment) throw new Error('더이상 댓글이 존재하지 않습니다');

  return await Comment.find({ cardId }).skip(skip).limit(5);
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
