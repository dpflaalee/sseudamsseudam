const express = require('express');
const router = express.Router();
const TARGET_TYPE = require('./../../shared/constants/TARGET_TYPE');
const { Post, User, Image, Comment, Hashtag, Complain, MyPrize, Prize } = require('../models');
console.log('🔍 Post 모델 확인:', typeof Post);
console.log('🔍 Comment 모델 확인:', typeof Comment);
const { Op } = require('sequelize');

// 0. PostCard.js : 관리자가 쓴 글(공지사항) 보기
// admin/
router.get('/', async (req, res, next) => {
    try {
        const where = { userId: req.user.id }; // 로그인한 사용자의 게시물만 조회
        if (parseInt(req.query.lastId, 10)) {
            where.id = {
                [Op.lt]: parseInt(req.query.lastId, 10)
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
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 1. ComplainCard.js : 신고 내용 보기
// /admin/complain
// routes/complain.js
router.get('/complain', async (req, res, next) => {
    try {
        const complainList = await Complain.findAll({
            include: [
                { model: User, as: 'Reporter', attributes: ['id', 'nickname'] },
            ]
        });

        const enriched = await Promise.all(
            complainList.map(async (complain) => {
                let target = null;
                console.log('🦠 complain.targetType', complain.targetType);
                console.log('🧪 complain.targetType =', complain.targetType, typeof complain.targetType);
                console.log('🧪 TARGET_TYPE =', TARGET_TYPE);

                switch (complain.targetType) {
                    case TARGET_TYPE.POST:
                        target = await Post.findByPk(Number(complain.targetId), {
                            include: [{ model: User, attributes: ['id', 'nickname'] }],
                        });
                        break;
                    case TARGET_TYPE.COMMENT:
                        target = await Comment.findByPk(Number(complain.targetId), {
                            include: [{ model: User, attributes: ['id', 'nickname'] }],
                        });
                        break;
                    case TARGET_TYPE.USER:
                        target = await User.findByPk(Number(complain.targetId), {
                            attributes: ['id', 'nickname', 'email'],
                        });
                        break;
                    case TARGET_TYPE.RANDOMBOX:
                        target = await Prize.findByPk(Number(complain.targetId), {
                            include: [{ model: Prize, attributes: ['id', 'content'], }]
                        });
                        break;
                }

                if (!target) {
                    console.warn(`⚠️ target을 찾을 수 없습니다. complainId=${complain.id}, targetId=${complain.targetId}`);
                }
                return {
                    ...complain.toJSON(),
                    targetObject: target ?? null
                };
            })
        );

        res.status(200).json(enriched);
    } catch (err) {
        console.error('🚨 알림 조회 중 에러:', err);
        res.status(500).send('알림 조회 실패');
    }
});

module.exports = router;