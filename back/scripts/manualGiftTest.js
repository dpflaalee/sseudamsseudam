const { User, Animal, Prize, MyPrize } = require('../models'); 

const manualGiftTest = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.log(`유저 ${userId}가 존재하지 않습니다.`);
      return;
    }

    // 유저가 키운 동물들 가져오기
    const animals = await Animal.findAll({
      where: { UserId: user.id },
      attributes: ['id', 'CategoryId']
    });

    if (!animals.length) {
      console.log(`유저 ${userId}에게 동물이 없습니다.`);
      return;
    }

    // 유저가 키운 동물 중에서 랜덤으로 하나 선택
    const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
    const categoryId = selectedAnimal.CategoryId;

    // 동물의 CategoryId에 맞는 랜덤박스 상품들 찾기
    const prizes = await Prize.findAll({
      where: { CategoryId: categoryId, type: 'randombox' }
    });

    if (!prizes.length) {
      console.log(`유저 ${userId}에게 해당 카테고리 랜덤박스 상품이 없습니다.`);
      return;
    }

    // 카테고리와 일치하는 랜덤박스 상품 중에서 하나를 선택
    const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];

    // 발급된 랜덤박스를 MyPrize에 기록하지 않고, 해당 랜덤박스만 콘솔에 출력
    console.log(`✅ 유저 ${user.id}에게 '${selectedPrize.content}' 카테고리의 랜덤박스가 발급되었습니다.`);
  } catch (error) {
    console.error('❌ 수동 발급 중 오류 발생:', error);
  }
};

manualGiftTest(1);
