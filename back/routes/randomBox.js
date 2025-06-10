const express = require('express');
const router = express.Router();
const { Prize, MyPrize, Sequelize, sequelize, Category, User } = require('../models');
const { Op } = Sequelize;
const { isLoggedIn } = require('./middlewares');

// 1) 카테고리별 랜덤박스 열기 - 확률 기반 추첨, 수량 차감 없이 MyPrize 발급 (수량 차감은 사용 시)
router.post('/open/:category', isLoggedIn, async (req, res) => {
  const { category } = req.params;
  const userId = req.user.id;

  try {
    const prizes = await Prize.findAll({
      where: {
        CategoryId: category,
        quantity: { [Op.gt]: 0 },
        dueAt: { [Op.gt]: new Date() },
        probability: { [Op.gt]: 0 }
      }
    });

    if (!prizes.length) {
      return res.status(200).json({ success: false, message: '당첨 가능한 상품이 없습니다.' });
    }

    const totalProb = prizes.reduce((sum, p) => sum + p.probability, 0);
    const rand = Math.random() * totalProb;

    let sum = 0;
    let selectedPrize = null;
    for (const prize of prizes) {
      sum += prize.probability;
      if (rand <= sum) {
        selectedPrize = prize;
        break;
      }
    }

    if (!selectedPrize) {
      return res.status(200).json({ success: false, message: '아쉽지만 당첨되지 않았습니다.' });
    }

    await sequelize.transaction(async (t) => {
      await MyPrize.create({
        UserId: userId,
        PrizeId: selectedPrize.id,
        issuedReason: '주간 좋아요 순위 5위 내 선정 보상',
        dueAt: selectedPrize.dueAt,
      }, { transaction: t });
    });

    return res.status(200).json({
      success: true,
      itemName: selectedPrize.content,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// 2) 유저가 받은 랜덤박스(쿠폰) 리스트 조회 (마이페이지) - isRead, usedAt 포함
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const myPrizes = await MyPrize.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: Prize,
          as: 'prize',  
          include: [{ model: Category, as: 'category' }],
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json({
      success: true,
      data: myPrizes.map(mp => ({
        id: mp.id,
        content: mp.Prize ? mp.Prize.content : '상품 정보 없음',
        category: mp.Prize && mp.Prize.Category ? mp.Prize.Category.content : '카테고리 없음',
        barcode: mp.Prize ? mp.Prize.barcode : '',
        issuedAt: mp.createdAt,
        isRead: mp.isRead,
        usedAt: mp.usedAt,
      }))
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// 3) 쿠폰 사용 처리 - 쿠폰 사용 시 Prize 수량 차감
router.post('/use/:id', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const myPrizeId = req.params.id;

  try {
    const myPrize = await MyPrize.findOne({
      where: { id: myPrizeId, UserId: userId, isRead: false },
      include: [{ model: Prize }]
    });

    if (!myPrize) {
      return res.status(400).json({
        success: false,
        message: '쿠폰이 존재하지 않거나 이미 사용되었습니다.'
      });
    }

    await sequelize.transaction(async (t) => {
      // 1. 쿠폰 사용 처리
      myPrize.isRead = true;
      myPrize.usedAt = new Date();
      await myPrize.save({ transaction: t });

      // 2. 상품 수량 차감
      const prize = await Prize.findByPk(myPrize.PrizeId, { transaction: t });
      if (prize.quantity > 0) {
        prize.quantity -= 1;
        await prize.save({ transaction: t });
      }
    });

    return res.status(200).json({
      success: true,
      message: '쿠폰이 성공적으로 사용되었습니다.',
      coupon: {
        name: myPrize.Prize.content,
        barcode: myPrize.Prize.barcode,
        usedAt: myPrize.usedAt,
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '쿠폰 사용 중 서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
