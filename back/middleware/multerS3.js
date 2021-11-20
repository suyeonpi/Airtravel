import aws from 'aws-sdk';
import { config } from '../config.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AppError from '../utils/AppError.js';

const { bucketName, bucketRegion, accessKey, secretKey } = config.s3;

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: bucketRegion,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

export const upload = (prefix) =>
  multer({
    fileFilter: multerFilter,
    storage: multerS3({
      s3,
      bucket: bucketName,
      acl: 'public-read',
      key: function (req, file, cb) {
        const strOne = `${prefix}`;
        const userId = `${req.userId}-`;
        const todaysDate = `${Date.now().toString()}.`;
        const extension = file.mimetype.split('/')[1];
        const finalStr = strOne.concat(userId, todaysDate, extension);
        cb(null, finalStr);
      },
    }),
  });

export const uploadUserPhoto = upload('user').fields([
  { name: 'user_url', maxCount: 1 },
  { name: 'back_url', maxCount: 1 },
]);
