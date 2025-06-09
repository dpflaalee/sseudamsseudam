const express = require('express');
const router = express.Router();
const TARGET_TYPE = require('./../../shared/constants/TARGET_TYPE');
const { Post, User, Image, Comment, Hashtag, Complain, Randombox } = require('../models');
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
        const complains = await Complain.findAll({
            include: [
                { model: User, as: 'Reporter', attributes: ['id', 'nickname'] },
            ],
            order: [['createdAt', 'DESC']],
        });

        const complainsWithTarget = await Promise.all(complains.map(async (report) => {
            let target = null;

            if (report.targetType === TARGET_TYPE.POST) {
                target = await Post.findOne({
                    where: { id: report.targetId },
                    include: [{ model: User, attributes: ['id', 'nickname'] }]
                });
            } else if (report.targetType === TARGET_TYPE.COMMENT) {
                target = await Comment.findOne({
                    where: { id: report.targetId },
                    include: [{ model: User, attributes: ['id', 'nickname'] }]
                });
            } else if (report.targetType === TARGET_TYPE.USER) {
                target = await User.findOne({
                    where: { id: report.targetId },
                    attributes: ['id', 'nickname', 'email']
                });
            } else if (report.targetType === TARGET_TYPE.RANDOMBOX) {
                target = await Randombox.findOne({
                    where: { id: report.targetId },
                    attributes: ['id', 'nickname', 'email']
                });
            }

            return {
                ...report.toJSON(),
                targetObject: target,
            };
        }));

        res.status(200).json(complainsWithTarget);
    } catch (err) {
        console.error('🚨 신고 목록 조회 실패: ', err);
        res.status(500).send('신고 조회 실패');
    }
});

// 2. CategoryManage.js : 카테고리 관리
// /admin/categorymanage

// 3. ChallengeManage.js : 챌린지 관리
// /admin/callengemanage

// 4. ScheduleManage.js : 일정 관리
// /admin/schedulemanage

// 5. PrizeManage.js : 상품 관리
// admin/prizemanage

module.exports = router;