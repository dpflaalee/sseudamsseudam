const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, OpenScope } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if( parseInt(req.query.lastId, 10) ) { where.id={ [Op.lt]: parseInt(req.query.lastId, 10) } }
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
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname', 'isAdmin'] }] },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }] },
        { model: OpenScope }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/myPost', async (req, res, next) => {
  try {
    const where = {};
    console.log('req.query.userId',req.query.userId);
    console.log('req.query.lastId',req.query.lastId);
    const userId = req.query.userId;
    
    if(userId !== 'undefined'){
    //if(req.query.userId){
      where.UserId = req.query.userId;
    }
    if( parseInt(req.query.lastId, 10) ) { where.id={ [Op.lt]: parseInt(req.query.lastId, 10) } }
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
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname', 'isAdmin'] }] },
        { model: User, as: 'Likers', attributes: ['id'] },
        { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }] },
        { model: OpenScope }
      ]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;