const express = require('express');
const router = express.Router();

const multer = require('multer');  // 파일업로드
const path = require('path');  // 경로
const fs = require('fs');  // file system

const { Post, User, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

//이미지 폴더 생성
try{
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으면 생성합니다.');
  fs.mkdirSync('uploads');
}

//1. 업로드 설정
const upload = multer({
  storage: multer.diskStorage({
    destination( req, file, done ) {
      done(null, 'uploads');
    },
    filename( req, file, done ) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 10*1024*1024 }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try{
    // 1. 해시태그 추출
    const hashtags = req.body.content.match(/#[^\s#]+/g) //   /#/g    #찾아
    // 2. 게시글저장
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    // 3. 해시태그 존재하면 - 해시태그 저장
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag)=>
          Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      )
      await post.addHashtags( result.map(v => v[0]) )
    }
    // 4. 이미지처리
    if(req.body.image) {
      if( Array.isArray(req.body.image) ) {
        
        const images = await Promise.all(
          req.body.image.map( (image)=> Image.create({ src: image }))
        );
        await post.addImages(images);

      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    // 5. 게시글 상세정보조회
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        { model: User , as: 'Likers' , attributes: ['id'] },
        { model: User , attributes: ['id','nickname'] },
        { model: Comment, include: [{ model: User, attributes: ['id','nickname'] }]}
      ]
    });

    res.status(201).json(fullPost);
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map( (v)=> v.filename));
});

// 게시글 상세보기
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        { model: Image },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: User, attributes: ['id', 'nickname'] },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] },
      ],
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//4. 좋아요 추가
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try{
    const post = await Post.findOne({ where: {id: req.params.postId} });
    if(!post) {return res.status(403).send('게시글을 확인해주세요');}

    await post.addLikers(req.user.id)
    res.json({ UserId: req.user.id , PostId: post.id })
  } catch(error) {
    console.error(error);
    next(error);
  }
});

//5. 좋아요 삭제
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try{
    const post = await Post.findOne({ where: {id: req.params.postId} });
    if(!post) {return res.status(403).send('게시글을 확인해주세요');}

    await post.removeLikers(req.user.id)
    res.json({ UserId: req.user.id , PostId: post.id })
  } catch(error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;