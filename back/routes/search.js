const express = require('express');
const router = express.Router();

const { Post, User, Group } = require('../models');
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
        });

        const groupResults = await Group.findAll({
            where: {
                title: { [Op.like]: `%${keyword}%` },
            },
        });

        const memberResults = await User.findAll({
            where: {
                nickname: { [Op.like]: `%${keyword}%` },
            },
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