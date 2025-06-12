const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, OpenScope, Category } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const where = {};

    const userId = req.query.userId;
    const number = req.query.number;
    const lastId = parseInt(req.query.lastId, 10);

    console.log('req.query:', req.query);
    console.log('req.user?.id:', req.user?.id);

    // 무한 스크롤용
    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }

    // 마이페이지: 로그인 상태에서 본인 글
    if (userId === 'undefined' && number === '1' && req.user) {
      where.UserId = req.user.id;
    }

    // 다른 사람의 유저 페이지
    if (userId && userId !== 'undefined' && number === '2' && req.user) {
      where.UserId = parseInt(userId, 10);
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC']
      ],
      include: [
        { model: User, attributes: ['id', 'nickname', 'isAdmin'] },
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ['id', 'nickname', 'isAdmin'] }],
        },
        { model: User, as: 'Likers', attributes: ['id'] },
        {
          model: Post,
          as: 'Retweet',
          include: [
            { model: User, attributes: ['id', 'nickname'] },
            { model: Image },
          ],
        },
        { model: OpenScope },
        {
          model: Category,
          as: 'Categorys',
          through: { attributes: [] },
          attributes: ['id', 'content', 'isAnimal'],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;