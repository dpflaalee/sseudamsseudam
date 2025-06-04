const express = require('express');
const router = express.Router();

const { Post, User, Group, Notification } = require('../models');

const { Op } = require('sequelize');


// 알림 저장
router.post('/', async (req, res, next) => {
    console.log('🦠 notificationRouter POST 진입');
    console.log('📦 req.body:', req.body);

    try {
        const notification = await Notification.create({
            type: req.body.notiType,
            targetId: req.body.targetId,
            SenderId: req.body.senderId,
            ReceiverId: req.body.receiverId,
        });

        const fullNotification = await Notification.findOne({
            where: { id: notification.id },
            include: [
                { model: User, as: 'Sender', attributes: ['id', 'nickname'] },
                { model: User, as: 'Receiver', attributes: ['id', 'nickname'] },
            ],
        });

        res.status(201).json(fullNotification);
    } catch (err) {
        console.error('🚨 알림 생성 중 에러:', err);
        console.error('🔍 Sequelize Validation Errors:', err.errors?.map(e => e.message));
        res.status(500).send('알림 실패');
    }
});


// 알림 보기
router.get('/', async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            where: { ReceiverId: req.query.userId },
            include: [
                { model: User, as: 'Sender', attributes: ['id', 'nickname'] },
                { model: User, as: 'Receiver', attributes: ['id', 'nickname'] },
            ],
            order: [['createdAt', 'DESC']], // 최신순 정렬
        });

        res.status(200).json(notifications);
    } catch (err) {
        console.error('🚨 알림 조회 중 에러:', err);
        res.status(500).send('알림 조회 실패');
    }
});

module.exports = router;