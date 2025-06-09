const express = require('express');
const router = express.Router();

const multer = require('multer');  // 파일업로드
const path = require('path');  // 경로
const fs = require('fs');  // file system

const { Post, User, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

//이미지 폴더 생성
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으면 생성합니다.');
  fs.mkdirSync('uploads');
}

// 업로드 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    // 해시태그 추출
    const hashtags = req.body.content.match(/#[^\s#]+/g) //   /#/g    #찾아
    // 게시글저장
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    // 해시태그 존재하면 - 해시태그 저장
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { content: tag.slice(1).toLowerCase() }
          })
        )
      )
      await post.addHashtags(result.map(v => v[0]))
    }
    // 이미지처리
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {

        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);

      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    // 게시글 상세정보조회
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: User, attributes: ['id', 'nickname'] },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname'] }] }
      ]
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
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
        { model: Post, as: 'Retweet', include: [User, Image] }
      ],
    });
    if (!post) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }

    // 댓글 데이터 가공: 부모댓글과 대댓글 분리 후 대댓글을 부모댓글에 묶기
    const comments = post.Comments.map(comment => comment.toJSON());
    const parentComments = comments.filter(c => !c.RecommentId);
    const childComments = comments.filter(c => c.RecommentId);

    const commentsWithReplies = parentComments.map(parent => ({
      ...parent,
      Recomments: childComments.filter(child => child.RecommentId === parent.id),
    }));

    // post 데이터에 댓글 배열 대체
    const postData = post.toJSON();
    postData.Comments = commentsWithReplies;

    res.json(postData);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 글 수정
router.patch('/:postId', isLoggedIn, async (req, res, next) => {
  const hashtags = req.body.content.match(/#[^\s#]+/g);
  try {
    await Post.update({
      content: req.body.content,
    }, {
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }
    });
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(
        (tag) => Hashtag.findOrCreate({
          where: { content: tag.slice(1).toLowerCase() },
        })
      ));
      await post.setHashtags(result.map((v) => v[0]));
    }
    res.status(200).json({ PostId: parseInt(req.params.postId, 10), content: req.body.content });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id
      }
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });

  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 추가
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) { return req.status(403).send('게시글을 확인해주세요'); }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
      RecommentId: req.body.RecommentId || null,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ['id', 'nickname'] }]
    });
    res.status(200).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 삭제
router.delete('/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    await Comment.destroy({
      where: {
        id: commentId,
        PostId: req.params.postId,
        UserId: req.user.id
      }
    });
    res.status(200).json({ PostId: parseInt(postId, 10), CommentId: parseInt(commentId, 10) });

  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요 추가
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) { return res.status(403).send('게시글을 확인해주세요'); }

    await post.addLikers(req.user.id)
    res.json({ UserId: req.user.id, PostId: post.id })
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요 삭제
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) { return res.status(403).send('게시글을 확인해주세요'); }

    await post.removeLikers(req.user.id)
    res.json({ UserId: req.user.id, PostId: post.id })
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/:postId/retweet' , isLoggedIn , async(req, res, next) => {
  try {
      //1. 기존 게시글 확인 - findOne
      const post = await Post.findOne({
        where: { id:req.params.postId },
        include: [{model:Post, as: 'Retweet'}]
      });
      if (!post) {return res.status(403).send('게시글을 확인해주세요');}

      //2. 리트윗-조건확인 : 본인글인지 확인 || 리트윗 한적있는지 확인
      if ( req.user.id === post.UserId
        || ( post.Retweet && post.Retweet.UserId === req.user.id )
      ) {return res.status(403).send('본인게시물은 리트윗할 수 없습니다.');}      
      
      //3. 리트윗할 게시글 번호
      const retweetTargetId = post.RetweetId || post.id

      //4. 중복리트윗여부
      const exPost = await Post.findOne({
        where: {
          UserId: req.user.id,
          RetweetId: retweetTargetId,
        }
      })
      if (exPost){ return res.status(403).send('이미 리트윗한 게시물입니다.'); }

      //5. 리트윗 생성 - create
      const retweet = await Post.create({
          UserId: req.user.id, RetweetId: retweetTargetId, content: 'retweet',
      });

      //6. 리트윗 상세조회
      const retweetDetail = await Post.findOne({
        where: { id:retweet.id },
        include: [
                  {model:Post, as: 'Retweet', include: [
                    {model:User, attributes: ['id','nickname']},
                    {model:Image}, 
                  ]}, 
                  {model:User, attributes: ['id','nickname']},
                  {model:Image}, 
                  {model:Comment, include: [{model:User, attributes: ['id','nickname']},]}, ]
      });

      //7. res 응답
      res.status(201).json(retweetDetail);

  } catch (error) {
    console.error(error)
    next(error)
  }
});

router.get('/:postId', async (req, res, next) => { // GET /post/1
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        })
        res.status(200).json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;