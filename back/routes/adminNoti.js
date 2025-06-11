const express = require('express');
const router = express.Router();
const TARGET_TYPE = require('./../../shared/constants/TARGET_TYPE');
const { Post, User, Image, Comment, Hashtag, Complain, MyPrize, Prize } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
    try {
        const admins = await User.findAll({ where: { isAdmin: true } });
        const adminIds = admins.map(admin => admin.id);

        console.log('🎅 admin', admins);
        const adminNoti = await Post.findAll({
            where: {
                UserId: { [Op.in]: adminIds }
            },
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image
                }, {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname']
                        }
                    ]
                }, {
                    model: User, as: 'Likers',
                    attributes: ['id']
                }, {
                    model: Post, as: 'Retweet',
                    include: [{
                        model: User,
                        attributes: ['id', 'nickname']
                    }, {
                        model: Image
                    }]      // 원본 글 작성자와 이미지 포함
                }
            ]
        });
        if (!admins) {
            return res.status(404).json({ message: '관리자 계정을 찾을 수 없습니다.' });
        }
        res.status(200).json(adminNoti);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;