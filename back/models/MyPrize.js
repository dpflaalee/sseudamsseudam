module.exports = (sequelize, DataTypes) => {
  const MyPrize = sequelize.define('MyPrize', {
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
      allowNull: false,
    issuedReason: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true, // 사용 전엔 null
    },
    dueAt: {
      type: DataTypes.DATE,
      allowNull: false  // Prize의 dueAt을 복사해서 초기화
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  });

  //관계 설정
  

  return MyPrize;
};
