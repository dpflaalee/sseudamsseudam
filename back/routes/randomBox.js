const express = require('express');
const router = express.Router();
const { Prize, MyPrize, IssuedRandomBox, Sequelize, Category, Animal } = require('../models');
const { Op } = Sequelize;
const { isLoggedIn } = require('./middlewares');

// --- 1) 랜덤박스 사용 처리 ---
router.post('/issued/use/:issuedId', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  const issuedId = req.params.issuedId;

  try {
    const issuedBox = await IssuedRandomBox.findOne({
      where: { id: issuedId, UserId: userId },
      include: [{ model: Category, as: 'category' }]
    });

    if (!issuedBox) {
      return res.status(404).json({ success: false, message: '발급된 랜덤박스를 찾을 수 없습니다.' });
    }

    if (issuedBox.usedAt) {
      return res.status(400).json({ success: false, message: '이미 사용된 랜덤박스입니다.' });
    }

    const realPrizes = await Prize.findAll({
      where: {
        CategoryId: issuedBox.CategoryId,
        quantity: { [Op.gt]: 0 },
        dueAt: { [Op.gt]: new Date() }
      }
    });

    if (!realPrizes.length) {
      return res.status(200).json({ success: false, message: '당첨 가능한 상품이 없습니다.' });
    }

    const totalProb = realPrizes.reduce((sum, p) => sum + p.probability, 0);
    const rand = Math.random() * totalProb;

    let sum = 0;
    let selectedPrize = null;
    for (const p of realPrizes) {
      sum += p.probability;
      if (rand <= sum) {
        selectedPrize = p;
        break;
      }
    }

    let coupon = null;
    if (selectedPrize) {
      // ✅ 중복 확인: 이미 동일 상품을 받은 적 있는지 확인
      const alreadyIssued = await MyPrize.findOne({
        where: {
          UserId: userId,
          PrizeId: selectedPrize.id
        }
      });

      if (alreadyIssued) {
        return res.status(409).json({
          success: false,
          message: '이미 발급된 상품입니다. 다른 랜덤박스를 사용해 보세요.'
        });
      }

      // 수량 감소 및 저장
      selectedPrize.quantity -= 1;
      await selectedPrize.save();

      // 쿠폰 발급
      const myPrize = await MyPrize.create({
        UserId: userId,
        PrizeId: selectedPrize.id,
        issuedReason: 'used_random_box',
        dueAt: selectedPrize.dueAt,
        usedAt: new Date(),
        isRead: false
      });

      coupon = {
        content: selectedPrize.content,
        issuedAt: myPrize.createdAt,
        usedAt: myPrize.usedAt,
      };
    }

    // 랜덤박스 사용 처리
    issuedBox.usedAt = new Date();
    await issuedBox.save();

    return res.status(200).json({
      success: true,
      message: selectedPrize ? '🎉 축하합니다! 쿠폰이 발급되었습니다.' : '😢 아쉽게도 당첨되지 않았습니다.',
      coupon
    });
  } catch (err) {
    console.error('랜덤박스 사용 오류:', err.message, err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});


// --- 2) 유저가 받은 미사용 랜덤박스 목록 조회 ---
router.get('/issued', isLoggedIn, async (req, res) => {
  try {
    const issuedBoxes = await IssuedRandomBox.findAll({
      where: { UserId: req.user.id, usedAt: null },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'content']
      }]
    });

    return res.status(200).json({
      success: true,
      data: issuedBoxes.map(box => ({
        issuedId: box.id,
        categoryId: box.CategoryId,
        category: {
          id: box.category?.id || null,
          content: box.category?.content || null,
        },
        issuedAt: box.issuedAt,
      }))
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// --- 3) 유저가 받은 사용 가능한 랜덤박스 목록 조회 ---
router.get('/issued/list', isLoggedIn, async (req, res) => {
  try {
    const issuedBoxes = await IssuedRandomBox.findAll({
      where: { 
        UserId: req.user.id, 
        usedAt: null  // 미사용 박스만 필터링
      },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'content']
      }]
    });

    return res.status(200).json({
      success: true,
      data: issuedBoxes.map(box => ({
        issuedId: box.id,
        categoryId: box.CategoryId,
        category: box.Category.content,
        issuedAt: box.issuedAt
      }))
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: '서버 오류' });
  }
});

module.exports = router;
