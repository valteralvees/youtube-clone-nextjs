import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto'

aws.config.update({
  secretAcessKey: process.env.AWS_SECRET_KEY,
  acessKeyId: process.env.AWS_ACESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3({
  /*... */
});

const upload = multer ({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read', //nível de acesso
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file,cb){
      cb (null, {fieldName:file.fieldname});
    },
    key(req,file,cb){
      crypto.randomBytes(16,(err,hash)=>{
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
});

export default upload;
