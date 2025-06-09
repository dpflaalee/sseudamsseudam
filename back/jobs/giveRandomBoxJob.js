const { User, Post, Prize, Animal, sequelize } = require('../models');
const { Op } = require('sequelize');
const cron = require('node-cron');
 
// 매주 월요일 9시에 실행
cron.schedule('0 9 * * 1', async () => {
  console.log('🎁 랜덤박스 자동 지급 시작:', new Date());

  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // 1. 지난 7일간 좋아요 수 기준 상위 5명 유저 조회
    const topUsers = await User.findAll({
      attributes: [
        'id',
        'nickname',
        [sequelize.fn('COUNT', sequelize.col('Liked.Like.createdAt')), 'likeCount']
      ],
      include: [{
        model: Post,
        as: 'Liked',
        attributes: [],
        through: {
          attributes: [],
          where: {
            createdAt: { [Op.gte]: oneWeekAgo }
          }
        }
      }],
      group: ['User.id'],
      order: [[sequelize.literal('likeCount'), 'DESC']],
      limit: 5,
      subQuery: false,
    });

    if (topUsers.length === 0) {
      console.log('상위 유저 없음. 지급 중단');
      return;
    }

    // 2. 유저별로 랜덤한 동물 1마리 선택 → 그 동물의 카테고리 기준으로 랜덤박스 지급
    for (const user of topUsers) {
      const animals = await Animal.findAll({
        where: { UserId: user.id },
        attributes: ['id', 'CategoryId']
      });

      if (!animals.length) {
        console.log(`🚫 유저 ${user.id} (${user.nickname})는 동물 없음`);
        continue;
      }

      // 랜덤 동물 선택
      const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
      const categoryId = selectedAnimal.CategoryId;

      // 해당 카테고리에 해당하는 랜덤박스 상품들 조회
      const prizes = await Prize.findAll({
        where: { CategoryId: categoryId }
      });

      if (!prizes.length) {
        console.log(`🎁 유저 ${user.id} (${user.nickname}) - 카테고리 ${categoryId} 상품 없음`);
        continue;
      }

      // 상품 중 랜덤 1개 선택 후 지급
      const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];
      await user.addPrize(selectedPrize);

      console.log(`유저 ${user.id} (${user.nickname})에게 [${selectedPrize.content}] 지급 (카테고리 ${categoryId})`);
    }

    console.log('🎉 랜덤박스 자동 지급 완료');
  } catch (error) {
    console.error('❌ 지급 중 오류 발생:', error);
  }
});
