import Mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { createVirtualId } from '../db/database.js';
import { config } from '../config.js';

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: [true, '아이디를 입력해주세요'],
    unique: true,
    minlength: [5, '아이디는 5자 이상 입력해주세요'],
  },
  usernick: {
    type: String,
    required: [true, '닉네임을 입력해주세요'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요'],
    minlength: [8, '비밀번호는 최소 8자 이상 입력해주세요'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, '비밀번호를 다시 확인해주세요'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: '비밀번호가 일치하지 않습니다',
    },
  },
  user_url: String,
  back_url: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  deactivatedOn: {
    type: Date,
    index: true,
    select: false,
  },
});

createVirtualId(userSchema);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, config.bcrypt.saltRounds);

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  inputpassword,
  userpassword
) {
  return await bcrypt.compare(inputpassword, userpassword);
};

export const User = Mongoose.model('User', userSchema);

export const findByUsername = async (username) => {
  return await User.findOne({ username }).select('+password');
};

export const findByUsernick = async (usernick) => {
  return await User.findOne({ usernick });
};

export const findById = async (id) => {
  return await User.findById(id).select('+password');
};

export const create = async (user) => {
  return await new User(user).save().then((data) => data.id);
};

export const update = async (id, userinfo) => {
  return await User.findByIdAndUpdate(
    id,
    { ...userinfo },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const updateUserPassword = async (userId, pw, pwc) => {
  const user = await User.findById(userId).select('+password');
  user.password = pw;
  user.passwordConfirm = pwc;
  return await user.save();
};

export const deactive = async (id) => {
  return await User.findByIdAndUpdate(id, {
    active: false,
    deactivatedOn: Date.now(),
  });
};

export const findDeactivedId = async (username) => {
  return await User.findOne({ active: false, username });
};

export const findDeactivedNick = async (usernick) => {
  return await User.findOne({ active: false, usernick });
};
