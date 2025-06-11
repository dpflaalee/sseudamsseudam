const express = require('express');
const router = express.Router();
const { Prize, MyPrize, Sequelize, sequelize, Category, Animal } = require('../models');
const { Op } = Sequelize;
const { isLoggedIn } = require('./middlewares');

// --- 1) 랜덤박스 리스트 조회 ---
router.get('/', isLoggedIn, async (req, res) => { 
  try {
    // 유저가 소유한 동물과 해당 카테고리의 랜덤박스 상품 조회
    const animals = await Animal.findAll({
      where: { UserId: req.user.id },
      attributes: ['CategoryId']
    });

    if (!animals.length) {
      return res.status(200).json({ success: false, message: '동물이 없습니다.' });
    }

    // 동물 카테고리 ID 목록 생성
    const categoryIds = animals.map(animal => animal.CategoryId);

    // 해당 카테고리에 속한 랜덤박스 상품 조회
    const prizeItems = await Prize.findAll({
      where: {
        CategoryId: { [Op.in]: categoryIds },
        type: 'randombox',
        quantity: { [Op.gt]: 0 },
        dueAt: { [Op.gt]: new Date() }, // 유효 기간이 지나지 않은 상품만
      },
    });

    if (!prizeItems.length) {
      return res.status(200).json({ success: false, message: '랜덤박스 상품이 없습니다.' });
    }

    // 아직 사용되지 않은 랜덤박스 리스트 반환
    return res.status(200).json({
      success: true,
      data: prizeItems.map(prize => ({
        id: prize.id,
        content: prize.content,
        categoryId: prize.CategoryId,
        dueAt: prize.dueAt,
      }))
    });
  } catch (err) {
    console.error('랜덤박스 조회 오류:', err.message, err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// --- 2) 랜덤박스 사용 처리 ---
router.post('/use/:prizeId', isLoggedIn, async (req, res) => {  
  const userId = req.user.id;
  const prizeId = req.params.prizeId;

  try {
    // 랜덤박스 상품 조회
    const randomboxPrize = await Prize.findOne({
      where: { id: prizeId, type: 'randombox' }
    });

    if (!randomboxPrize) {
      return res.status(400).json({ success: false, message: '존재하지 않는 랜덤박스 상품입니다.' });
    }

    // MyPrize에 랜덤박스를 저장
    const myPrize = await MyPrize.create({
      UserId: userId,
      PrizeId: randomboxPrize.id,
      issuedReason: 'used_random_box',
      dueAt: randomboxPrize.dueAt,
      usedAt: new Date(),
      isRead: true,
    });

    // 실제 당첨 상품(타입 'real') 리스트 조회
    const realPrizes = await Prize.findAll({
      where: {
        CategoryId: randomboxPrize.CategoryId,
        type: 'real',
        quantity: { [Op.gt]: 0 }
      }
    });

    if (!realPrizes.length) {
      return res.status(200).json({ success: false, message: '당첨 가능한 상품이 없습니다.' });
    }

    // 당첨 확률 누적 계산
    const totalProb = realPrizes.reduce((sum, p) => sum + p.probability, 0);
    const rand = Math.random() * totalProb;

    let sum = 0;
    let selectedRealPrize = null;
    for (const p of realPrizes) {
      sum += p.probability;
      if (rand <= sum) {
        selectedRealPrize = p;
        break;
      }
    }

    // 랜덤박스 사용 후 쿠폰 발급
    let coupon = null;
    if (selectedRealPrize) {
      // 실제 상품 수량 차감
      selectedRealPrize.quantity -= 1;
      await selectedRealPrize.save();

      coupon = {
        content: selectedRealPrize.content,
        barcode: selectedRealPrize.barcode,
        issuedAt: myPrize.createdAt,
        usedAt: myPrize.usedAt,
      };
    }

    return res.status(200).json({
      success: true,
      message: selectedRealPrize ? '🎉 축하합니다! 쿠폰이 발급되었습니다.' : '😢 아쉽게도 당첨되지 않았습니다.',
      coupon,
    });
  } catch (err) {
    console.error('랜덤박스 사용 오류:', err.message, err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

// --- 3) 유저의 동물 카테고리별 랜덤박스 상품 그룹 조회 ---
router.get('/by-user-categories', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user.id;  // req.user.id에서 바로 가져오기  

    console.log("Received userId:", userId);  // userId 값 확인용 로그

    if (!userId) {
      return res.status(400).json({ error: 'userId가 필요합니다.' });
    }

    // 유저 정보 조회
    const user = await user.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
    }

    // 유저의 동물 정보 조회
    const animals = await Animal.findAll({
      where: { UserId: user.id },
      attributes: ['id', 'CategoryId']
    });

    console.log("유저의 동물 정보:", animals);  // animals 값 확인

    if (animals.length === 0) {
      return res.status(404).json({ error: '유저가 소유한 동물이 없습니다.' });
    }

    // 랜덤으로 동물 선택
    const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
    const categoryId = selectedAnimal.CategoryId;

    console.log("선택된 동물의 CategoryId:", categoryId);  // categoryId 값 확인

    // 카테고리 정보를 조회
    const category = await Category.findByPk(categoryId);
    console.log("선택된 카테고리:", category);  // 카테고리 정보 확인
    if (!category) {
      return res.status(404).json({ error: '카테고리가 존재하지 않습니다.' });
    }

    // 랜덤박스 발급 처리
    // 상품을 조회하지 않고, 카테고리 기준으로 발급 처리
    const prizeMessage = `${category.content} 랜덤박스`;

    // 실제 상품 발급 처리 로직은 생략하고 메시지 출력만
    console.log(`유저 ${user.username} (ID: ${userId}) 에게 카테고리 ${category.content} 랜덤박스를 발급.`);

    // 랜덤박스 발급 완료 메시지
    return res.json({
      message: `유저 ${user.username} (ID: ${userId})에게 카테고리 ${category.content} 랜덤박스를 발급 완료.`,
      prize: prizeMessage
    });

  } catch (error) {
    console.error('❌ API 오류 발생:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
