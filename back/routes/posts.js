const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment, OpenScope } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    console.log('req.query.userId',req.query.userId);
    console.log('req.query.userId',req.query.userId==='undefined');
    console.log('req.query.lastId',req.query.lastId);
    console.log('req.user.id',req.user.id);
    console.log('number', req.query.number == '1');
    console.log('number', req.query.number);
    const userId = req.query.userId;
    let number = req.query.number;
    //if(!isNaN(userId)){
    //로그인상태에서 유저아이디를 클릭했다면 
    //if(req.query.userId > 0 && req.query.userId !== 'undefined' && number == 2 && req.user){
    if(req.query.userId > 0 && number == 2 && req.user){
    console.log('입장');
    console.log(number);
      where.UserId = parseInt(req.query.userId, 10);
    }
    //로그인상태에서 본인아이디를 클릭했다면
    if((req.query.userId === 'undefined') && number == '1'){
      console.log('main');
      console.log(number);
      where.UserId = req.user.id;
    }
    //
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