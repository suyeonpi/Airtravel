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

likeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'card',
    select: 'title like_count',
  }).populate({
    path: 'user',
    select: 'usernick',
  });
});

export const Like = Mongoose.model('Like', likeSchema);

export const likeCard = async (cardId, userId) => {
  // const likeId = await Like.findOne({ card: cardId, user: userId });
  // if (likeId) {
  //   throw new Error('좋아요는 한번만 가능합니다');
  // }
  return await Like.create({ card: cardId, user: userId });
};

export const dislikeCard = async (cardId, userId) => {
  return await Like.deleteOne({ card: cardId, user: userId });
};