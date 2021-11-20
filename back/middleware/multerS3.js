import aws from 'aws-sdk';
import { config } from '../config.js';
import multer from 'multer';
import multerS3 from 'multer-s3-transform';
import sharp from 'sharp';
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

const upload = (prefix) =>
  multer({
    fileFilter: multerFilter,
    storage: multerS3({
      s3,
      bucket: bucketName,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      shouldTransform: function (req, file, cb) {
        cb(null, /^image/i.test(file.mimetype));
      },
      transforms: [
        {
          id: 'resized',
          key: function (req, file, cb) {
            const strOne = `${prefix}-`;
            const userId = `${req.userId}-`;
            const todaysDate = `${Date.now().toString()}.`;
            const extension = file.mimetype.split('/')[1];
            const finalStr = strOne.concat(userId, todaysDate, extension);
            cb(null, finalStr);
          },
          transform: function (req, file, cb) {
            cb(
              null,
              sharp().resize(1200, null).toFormat('jpg').jpeg({ quality: 90 })
            );
          },
        },
      ],
    }),
  });

export const uploadUserPhoto = upload('user').fields([
  { name: 'user_url', maxCount: 1 },
  { name: 'back_url', maxCount: 1 },
]);

export const uploadCardPhoto = upload('card').single('picture_url');
