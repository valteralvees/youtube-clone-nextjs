import nc from 'next-connect';
import connectToDatabase from 'src/utils/mongodb';
import upload from 'src/utils/upload';
import {ObjectId} from 'mongodb';,

const handler = nc()
  .use(upload.single('file'))
  .post(async (req,res)=>{
    
    const { title, authorId, authorName, authorAvatar, videoUrl}
    const { db } = await connectToDatabase();
    const collection = db.collection('videos');

    await collection.insertOne({
      title,
      authorId: ObjectId(authorId),
      authorName,
      authorAvatar,
      views: 0,
      thumb: req.file.location,
      videoUrl,
      updatedAt: new Date(),
    });
    res.json({ ok: 'true'});
  })
  .patch(async(req, res) =>{
    throw new Error('Throws me around! Error can be caught and handled.')
  });

export const config = {
  api : {
    bodyParser: false,
  },
};

export default handler;



