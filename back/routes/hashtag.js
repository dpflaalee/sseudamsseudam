const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, Hashtag } = require('../models');
const { Op } = require('sequelize');

router.get('/:hashtag', async (req, res, next) => {
  try{
    const where = {};
    if( parseInt(req.query.lastId, 10) ) { where.id={ [Op.lt]: parseInt(req.query.lastId, 10) } }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt','DESC'],
        [Comment,'createdAt','DESC']
      ],
      include: [
        { model:Hashtag , where: { content: decodeURIComponent(req.params.hashtag) } },
        { model:User , attributes: ['id','nickname'] },
        { model:Image },
        { model: Comment, include: [{ model: User , attributes: ['id','nickname']}] },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id','nickname'] }, { model: Image }] }
      ]
    });
    res.status(200).json(posts);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
