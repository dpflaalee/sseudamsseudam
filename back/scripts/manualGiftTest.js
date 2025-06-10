const { User, Animal, Prize, MyPrize } = require('../models');

const manualGiftTest = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log(`유저 ${userId}가 존재하지 않습니다.`);
      return;
    }

    const animals = await Animal.findAll({
      where: { UserId: user.id },
      attributes: ['id', 'CategoryId']
    });

    if (!animals.length) {
      console.log(`유저 ${userId}에게 동물이 없습니다.`);
      return;
    }

    const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
    const categoryId = selectedAnimal.CategoryId;

    const prizes = await Prize.findAll({
      where: { CategoryId: categoryId }
    });

    if (!prizes.length) {
      console.log(`유저 ${userId}에게 해당 카테고리 상품이 없습니다.`);
      return;
    }

    const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];

    // ❗ 여기서 직접 MyPrize 생성 (issuedReason과 dueAt 반드시 포함)
    await MyPrize.create({
      UserId: user.id,
      PrizeId: selectedPrize.id,
      issuedReason: '수동 테스트 발급',
      dueAt: selectedPrize.dueAt,
    });

    console.log(`✅ 유저 ${user.id}에게 '${selectedPrize.content}' 랜덤박스가 수동 발급되었습니다.`);
  } catch (error) {
    console.error('❌ 수동 발급 중 오류 발생:', error);
  }
};

manualGiftTest(1);
