const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, OpenScope, Category, Blacklist } = require('../models');
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

    // 로그인 상태인 경우 차단된 사용자 목록 가져오기
    if (req.user) {
      const blockedUsers = await Blacklist.findAll({
        where: {
          [Op.or]: [
            { BlockingId: req.user.id },  // 내가 차단한 사람들
            { BlockedId: req.user.id },   // 나를 차단한 사람들
          ],
        },
      });

      // 차단된 유저 아이디 배열 추출
      const blockedUserIds = blockedUsers.map(b => 
        b.BlockingId === req.user.id ? b.BlockedId : b.BlockingId
      );

      if (blockedUserIds.length > 0) {
        // 차단된 사용자 게시글 제외 조건 추가
        where.UserId = where.UserId
          ? (Array.isArray(where.UserId)
            ? { [Op.and]: [{ [Op.in]: where.UserId }, { [Op.notIn]: blockedUserIds }] }
            : where.UserId === req.user.id
              ? req.user.id  // 본인 게시글은 제외하지 않음
              : { [Op.and]: [{ [Op.eq]: where.UserId }, { [Op.notIn]: blockedUserIds }] }
            )
          : { [Op.notIn]: blockedUserIds };
      }
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