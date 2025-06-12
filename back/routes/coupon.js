const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { MyPrize, Prize } = require('../models');
const router = express.Router();

// 1. [GET] 내 쿠폰 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const myPrizes = await MyPrize.findAll({
      where: { userId: req.user.id },
      include: [{ model: Prize,  as: 'prize', }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      data: myPrizes,
    });
  } catch (error) {
    console.error('❌ 쿠폰 리스트 조회 실패:', error);
    res.status(500).json({ message: '쿠폰 리스트를 불러오는 중 오류가 발생했습니다.' });
  }
});

// 2. [POST] 쿠폰 사용
router.post('/use/:id', isLoggedIn, async (req, res) => {
  const prizeId = parseInt(req.params.id, 10);
  try {
    const myPrize = await MyPrize.findOne({
      where: { id: prizeId, userId: req.user.id },
    });

    if (!myPrize) {
      return res.status(404).json({ message: '해당 쿠폰을 찾을 수 없습니다.' });
    }

    if (myPrize.usedAt) {
      return res.status(400).json({ message: '이미 사용한 쿠폰입니다.' });
    }

    myPrize.usedAt = new Date();
    myPrize.isRead = true;
    await myPrize.save();

    res.status(200).json({
      message: '쿠폰이 성공적으로 사용되었습니다.',
      coupon: {
        id: myPrize.id,
        usedAt: myPrize.usedAt,
        isRead: true,
      },
    });
  } catch (error) {
    console.error('❌ 쿠폰 사용 실패:', error);
    res.status(500).json({ message: '쿠폰 사용 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
