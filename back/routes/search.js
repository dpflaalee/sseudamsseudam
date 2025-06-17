const express = require('express');
const router = express.Router();

const { Post, User, Group, Image, Comment, OpenScope, Category, Blacklist, Complain, UserProfileImage } = require('../models');
const { Op } = require('sequelize');
const TARGET_TYPE = require('../../shared/constants/TARGET_TYPE');


// 검색
router.get('/:searchInput', async (req, res, next) => {
    const keyword = req.params.searchInput;
    console.log('🔍 검색 키워드: ', keyword);
    const myId = req.user?.id;
    if (!myId) {
        return res.status(401).send('로그인 필요');
    }

    try {
        // 나를 차단한 유저
        const blockedMeUsers = await Blacklist.findAll({
            where: { BlockedId: myId },
            attributes: ['BlockingId'],
        });
        const blockingIds = blockedMeUsers.map(entry => entry.BlockingId);

        // 신고된 유저
        const blindedUser = await Complain.findAll({
            where: {
                isBlind: true,
                targetType: TARGET_TYPE.USER,
            },
            attributes: ['targetId'],
        });
        const blindedUserIds = blindedUser.map(entry => entry.targetId);

        // 신고된 게시글
        const complainPost = await Complain.findAll({
            where: {
                isBlind: true,
                targetType: TARGET_TYPE.POST,
            },
            attributes: ['targetId'],
        });
        const complainPostIds = complainPost.map(entry => entry.targetId);

        const excludedUserIds = [...new Set([...blockingIds, ...blindedUserIds])];

        const postResults = await Post.findAll({
            where: {
                content: { [Op.like]: `%${keyword}%` },
                UserId: { [Op.notIn]: excludedUserIds },
                id: { [Op.notIn]: complainPostIds },
            },
            include: [
                { model: User, attributes: ['id', 'nickname', 'isAdmin'], include: [{ model: UserProfileImage, attributes: ['id'] }] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname', 'isAdmin'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
                {
                    model: Post,
                    as: 'Retweet',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname'],
                            include: [{ model: UserProfileImage, attributes: ['id'] }] // ✅ 옳은 위치
                        },
                        { model: Image },
                    ]
                },
                { model: OpenScope }
            ]
        });

        const groupResults = await Group.findAll({
            where: {
                title: { [Op.like]: `%${keyword}%` },
            },
            include: [
                { model: Category, through: { attributes: [] } }
                , { model: OpenScope, attributes: ['id', 'content'] }
                , { model: User, as: 'groupmembers', attributes: ['id'], through: { attributes: [] } }
            ]
        });

        const memberResults = await User.findAll({
            where: {
                nickname: { [Op.like]: `%${keyword}%` },
                id: { [Op.notIn]: excludedUserIds },
            },
            include: [
                {
                    model: User,
                    as: 'Blocked',
                    attributes: ['id'],
                    through: { attributes: [] },
                },
            ],
        });

        res.json({
            post: postResults,
            group: groupResults,
            member: memberResults,
        });
    } catch (err) {
        console.error('🚨 searchRouter : ', err);
        res.status(500).send('검색 실패');
    }

});


module.exports = router;