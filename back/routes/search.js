const express = require('express');
const router = express.Router();

const { Post, User, Group, Image, Comment, OpenScope, Category, Blacklist } = require('../models');
const { Op } = require('sequelize');


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
        const blockedIds = blockedMeUsers.map(entry => entry.BlockingId);

        const postResults = await Post.findAll({
            where: {
                content: { [Op.like]: `%${keyword}%` },
                UserId: { [Op.notIn]: blockedIds },
            },
            include: [
                { model: User, attributes: ['id', 'nickname', 'isAdmin'] },
                { model: Image },
                { model: Comment, include: [{ model: User, attributes: ['id', 'nickname', 'isAdmin'] }] },
                { model: User, as: 'Likers', attributes: ['id'] },
                { model: Post, as: 'Retweet', include: [{ model: User, attributes: ['id', 'nickname'] }, { model: Image }] },
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
                id: { [Op.notIn]: blockedIds },
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