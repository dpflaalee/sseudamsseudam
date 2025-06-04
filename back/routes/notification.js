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

        res.status(201).json(notification);
    } catch (err) {
        console.error('🚨 알림 생성 중 에러:', err);
        res.status(500).send('알림 실패');
    }
});


// 알림 보내기
router.get('', async (req, res, next) => {
    // targetId종류 : 유저, 포스트, 댓글, 랜덤박스, 그룹, 관리자(포스트), 동물 프로필
    try {
        switch (notiType) {
            case RETWEET:
                const targetRetweet = await Post.findOne({ where: { retweetId: targetId } });
                break;
            case COMMENT:
                const targetComment = await Comment.findOne({ where: { id: targetId } });
                break;
            case LIKE:
                const targetLike = await Post.findOne({ where: { id: targetId } });
                break;
            case REPLY:
                const targetRecommnet = await Comment.findOne({ where: { recommenetId: targetId } });
                break;
            case RANDOMBOX:
                const targetRandomBox = await Randombox.findOne({ where: { id: targetId } });
                break;
            case GROUPAPPLY:
                const targetGroup = await Group.findOne({ where: { id: targetId } });
                break;
            case GROUPAPPLY_APPROVE:
                const targetGroup_approve = await Group.findOne({ where: { id: targetId } });
                break;
            case GROUPAPPLY_REJECT:
                const targetGroup_reject = await Group.findOne({ where: { id: targetId } });
                break;
            case ADMIN_NOTI:
                const targetAdminNoti = await Post.findOne({ where: { id: targetId } })
                break;
        }

    } catch (err) {
        console.error('🚨 searchRouter : ', err);
        res.status(500).send('알림 실패');
    }

});

module.exports = router;