const express = require('express');
const router = express.Router();

const { Post, User, Comment, Complain } = require('../models');
const { Op } = require('sequelize');

// 신고하기
router.post('/', async (req, res, next) => {
    try {
        const complain = await Complain.create({
            targetType: req.body.targetType,
            targetId: req.body.targetId,
            reason: req.body.reason,
            reporterId: req.body.reporter,  // ✅ 외래키
        });


        res.status(201).json(complain); // 원하는 형식으로 가공 가능
    } catch (err) {
        console.error('🚨 ComplainRouter 에러: ', err);
        res.status(500).send('신고 대상 검색 실패');
    }
});


module.exports = router;