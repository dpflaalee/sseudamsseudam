const express = require('express');
const router = express.Router();

const { Post, User, Group, Image, Comment, OpenScope, Category } = require('../models');
const { Op } = require('sequelize');


// 검색
router.get('/:searchInput', async (req, res, next) => {
    const keyword = req.params.searchInput;
    console.log('🔍 검색 키워드: ', keyword);
    try {
        const postResults = await Post.findAll({
            where: {
                content: { [Op.like]: `%${keyword}%` },
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
                { model: Category, attributes: ['id', 'content', 'isAnimal'] },
            ]
        });

        const memberResults = await User.findAll({
            where: {
                nickname: { [Op.like]: `%${keyword}%` },
            },
        });

        console.log('📑postResults', postResults);
        console.log('📑groupResults', groupResults);
        console.log('📑memberResults', memberResults);

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