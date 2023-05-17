const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.DO_SPACE_ACCESS_KEY,
  accessKeyId: process.env.DO_SPACE_ACCESS_ID,
  endpoint: process.env.DO_SPACE_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_SPACE_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  })
});

module.exports = upload;
