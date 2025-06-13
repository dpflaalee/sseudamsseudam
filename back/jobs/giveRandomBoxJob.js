const { User, Animal, Prize, Category, IssuedRandomBox, sequelize } = require('../models');
const cron = require('node-cron');

// 알림
const { Notification } = require('../models');
const NOTIFICATION_TYPE = require('../../shared/constants/NOTIFICATION_TYPE');

// 매시간 정각마다 실행
//cron.schedule('0 * * * *', async () => {
  console.log('🎁 랜덤박스 자동 지급 시작:', new Date());

  try {
    // 모든 유저 조회
    const users = await User.findAll();

    for (const user of users) {
      // 해당 유저의 동물들 가져오기
      const animals = await Animal.findAll({
        where: { UserId: user.id },
        attributes: ['id', 'CategoryId'],
      });

      if (!animals.length) {
        console.log(`🚫 유저 ${user.id} (${user.username})는 동물이 없음`);
        continue;
      }

      // 랜덤 동물 선택
      const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
      const categoryId = selectedAnimal.CategoryId;

      // 해당 카테고리에 맞는 랜덤박스(상품) 선택
      const prize = await Prize.findOne({
        where: { CategoryId: categoryId },
        order: sequelize.random(),
        include: {
          model: Category,
          as: 'category',
          attributes: ['content'],
        }
      });

      if (!prize) {
        console.log(`🚫 유저 ${user.id} (${user.username})에게 지급할 랜덤박스 없음`);
        continue;
      }

      // 지급 기록 저장
      const issuedBox = await IssuedRandomBox.create({
        UserId: user.id,
        CategoryId: categoryId,
        issuedAt: new Date(),
        usedAt: null // 아직 사용하지 않음
      });

      if (prize && issuedBox) {
        const notification = await Notification.create({
          type: NOTIFICATION_TYPE.RANDOMBOX,
          targetId: issuedBox.id,
          SenderId: 1,
          ReceiverId: user.id,
        });

        const fullNotification = await Notification.findOne({
          where: { id: notification.id },
          include: [
            { model: User, as: 'Sender', attributes: ['id', 'nickname'] },
            { model: User, as: 'Receiver', attributes: ['id', 'nickname'] },
          ],
        });

        console.log('📩 fullNotification:', fullNotification?.toJSON());

      }

      const categoryContent = prize.category?.content || '알 수 없는 카테고리';
      console.log(`✅ 유저 ${user.id} (${user.username})에게 [${categoryContent}] 랜덤박스 지급`);
    }

    console.log('🎉 랜덤박스 자동 지급 완료');
  } catch (error) {
    console.error('❌ 지급 중 오류 발생:', error);
  }
});
