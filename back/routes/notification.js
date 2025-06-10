const express = require('express');
const router = express.Router();

const { Post, User, Group, Notification, Animal, Comment, RandomBox } = require('../models');
const NOTIFICATION_TYPE = require('../../shared/constants/NOTIFICATION_TYPE');
const { Op } = require('sequelize');


// 알림 저장
router.post('/', async (req, res, next) => {
    try {
        console.log('🦠 notificationRouter POST 진입');
        console.log('📦 req.body:', req.body);

        if (req.body.notiType === NOTIFICATION_TYPE.ADMIN_NOTI) {
            const users = await User.findAll({
                attributes: ['id'], // 불필요한 데이터 제거
            });

            const notifications = await Promise.all(
                users.map((user) =>
                    Notification.create({
                        type: req.body.notiType,
                        targetId: req.body.targetId,
                        SenderId: req.body.SenderId,
                        ReceiverId: user.id,
                    })
                )
            );

            return res.status(201).json({
                message: `${notifications.length}명에게 관리자 공지 알림 발송 완료`,
            });
        }

        // 일반 알림 처리
        const notification = await Notification.create({
            type: req.body.notiType,
            targetId: req.body.targetId,
            SenderId: req.body.SenderId,
            ReceiverId: req.body.ReceiverId,
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
        res.status(500).send('알림 실패');
    }
});




// 알림 보기
router.get('/', async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            where: { ReceiverId: parseInt(req.query.userId, 10) },
            include: [
                { model: User, as: 'Sender', attributes: ['id', 'nickname'] },
                { model: User, as: 'Receiver', attributes: ['id', 'nickname'] },
            ],
            order: [['createdAt', 'DESC']],
        });

        const enriched = await Promise.all(
            notifications.map(async (noti) => {
                let target = null;

                switch (noti.type) {
                    case NOTIFICATION_TYPE.COMMENT:
                    case NOTIFICATION_TYPE.RECOMMENT:
                        target = await Comment.findByPk(noti.targetId, {
                            include: [
                                { model: User, attributes: ['id', 'nickname'] },
                                { model: Post, attributes: ['id',] }
                            ],
                        });
                        break;

                    case NOTIFICATION_TYPE.LIKE:
                    case NOTIFICATION_TYPE.RETWEET:
                        target = await Post.findByPk(noti.targetId, {
                            include: [
                                { model: User, attributes: ['id', 'nickname'] },
                                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }] },
                            ],

                        });
                        break;

                    case NOTIFICATION_TYPE.FOLLOW:
                        target = await User.findByPk(noti.targetId, {
                            include: [
                                { model: User, attributes: ['id', 'nickname'] }
                            ]
                        });
                        break;

                    case NOTIFICATION_TYPE.GROUPAPPLY:
                    case NOTIFICATION_TYPE.GROUPAPPLY_APPROVE:
                    case NOTIFICATION_TYPE.GROUPAPPLY_REJECT:
                        target = await Group.findByPk(noti.targetId);
                        break;

                    case NOTIFICATION_TYPE.ADMIN_NOTI:
                        target = await Post.findByPk(noti.targetId, {
                            include: [{ model: User, attributes: ['id', 'nickname'] }],
                        });
                        break;
                    case NOTIFICATION_TYPE.ANIMAL_FRIENDS:
                        target = await Animal.findByPk(noti.targetId, {
                            include: [{ model: Animal, as: 'Followings', attributes: ['id', 'aniName'] }],
                        })

                    case NOTIFICATION_TYPE.RANDOMBOX:
                        target = await RandomBox.findByPk(noti.targetId, {
                            include: [{ model: RandomBox, as: 'MyPrize', attributes: ['id', 'content', 'isRead'] }],
                        });
                }
                if (!target) {
                    console.warn(`⚠️ target을 찾을 수 없습니다. notiId=${noti.id}, targetId=${noti.targetId}`);
                }

                return {
                    ...noti.toJSON(),
                    targetObject: target,
                };
            })
        );

        res.status(200).json(enriched);
    } catch (err) {
        console.error('🚨 알림 조회 중 에러:', err);
        res.status(500).send('알림 조회 실패');
    }
});

// 알림 읽음 처리
// 전체 알림 읽음 처리
router.patch('/readAll', async (req, res, next) => {
    try {
        await Notification.update(
            { isRead: true },
            { where: { ReceiverId: req.body.userId } }
        );
        res.status(200).json({ message: '모든 알림 읽음 처리 완료' });
    } catch (err) {
        console.error('🚨 전체 읽음 처리 에러:', err);
        res.status(500).send('전체 읽음 처리 실패');
    }
});

// 알림 삭제
// 알림 삭제
router.delete('/:id', async (req, res, next) => {
    try {
        await Notification.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: '알림 삭제 완료', id: req.params.id });
    } catch (err) {
        console.error('🚨 알림 삭제 중 에러:', err);
        res.status(500).send('알림 삭제 실패');
    }
});


module.exports = router;