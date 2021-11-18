import Mongoose from 'mongoose';

const likeSchema = new Mongoose.Schema(
  {
    card: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Card',
      required: true,
    },
    user: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toOBject: { virtuals: true },
  }
);

export const Like = Mongoose.model('Like', likeSchema);

export const getAllCardsLiked = async (user) => {
  return await Like.find({ user })
    .populate({
      path: 'card',
      select: '-__v -userId',
    })
    .sort({ createdAt: -1 });
};

export const likeCard = async (cardId, userId) => {
  const likeId = await Like.findOne({ card: cardId, user: userId });
  if (likeId) {
    throw new Error('좋아요는 한번만 가능합니다');
  }
  return await Like.create({ card: cardId, user: userId });
};

export const dislikeCard = async (cardId, userId) => {
  return await Like.deleteOne({ card: cardId, user: userId });
};
