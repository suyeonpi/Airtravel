import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function createVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
