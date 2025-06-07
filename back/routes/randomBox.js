const express = require('express');
const router = express.Router();
const { Prize, Category } = require('../models');
const { isLoggedIn } = require('./middlewares');

// 유저가 랜덤박스 열기 (카테고리별)
router.post('/open/:categoryId', isLoggedIn, async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const prizes = await Prize.findAll({
      where: { CategoryId: categoryId },
    });

    if (!prizes.length) {
      return res.status(404).send('해당 카테고리에 상품이 없습니다.');
    }

    const rand = Math.random();
    let cumulative = 0;
    let selected = null;

    for (const prize of prizes) {
      cumulative += prize.probability;
      if (rand <= cumulative) {
        selected = prize;
        break;
      }
    }

    if (!selected) {
      return res.json({ message: '꽝! 당첨된 상품이 없습니다.' });
    }

    if (selected.quantity <= 0) {
      return res.status(400).send('상품이 모두 소진되었습니다.');
    }

    await selected.decrement('quantity');
    await req.user.addPrize(selected);

    return res.json({
      message: '축하합니다! 상품에 당첨되었습니다!',
      prize: selected,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});



// 유저가 받은 상품 리스트 (마이페이지)
router.get('/my-prizes', isLoggedIn, async (req, res, next) => {
  try {
    const prizes = await req.user.getPrizes({
      joinTableAttributes: [],
      include: [{ model: Category, as: 'category' }]
    });

    res.json(prizes);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
