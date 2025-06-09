const express = require('express');
const router = express.Router();
const { Post, User, Comment, Complain, Image } = require('../models');
const { Op } = require('sequelize');

// 신고하기
router.post('/', async (req, res, next) => {
    try {
        const complain = await Complain.create({
            targetType: req.body.targetType,
            targetId: req.body.targetId,
            reason: req.body.reason,
            ReporterId: req.body.reporterId,
        });

        res.status(201).json(complain); // 원하는 형식으로 가공 가능
    } catch (err) {
        console.error('🚨 ComplainRouter 에러: ', err);
        res.status(500).send('신고 대상 검색 실패');
    }
});

/// 신고 내용보기
router.get('/post/:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['id', 'nickname'] },
                { model: Comment },
                { model: Image }
            ]
        });
        if (!post) return res.status(404).send('게시글을 찾을 수 없습니다.');
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// routes/comment.js
router.get('/comment/:id', async (req, res, next) => {
    try {
        const comment = await Comment.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['id', 'nickname'] }
            ]
        });
        if (!comment) return res.status(404).send('댓글을 찾을 수 없습니다.');
        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// routes/user.js
router.get('/user/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'nickname', 'email']
        });
        if (!user) return res.status(404).send('유저를 찾을 수 없습니다.');
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;