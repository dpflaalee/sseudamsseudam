module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define('Prize', {
    content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    probability: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dueAt: {
      type: DataTypes.DATE, // DATETIME → DATE
      allowNull: false
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false, // createAt, updateAt 수동 정의 시 false
  });

  // 관계 설정
  Prize.associate = (db) => {
    // 1. Prize belongs to one Category (일대다 관계: many Prizes belong to one Category)
    db.Prize.belongsTo(db.Category, {
      foreignKey: 'CategoryId',
      as: 'category'
    });

    // 2. Prize belongs to many Users (유저가 당첨받은 상품들)
    db.Prize.belongsToMany(db.User, {
      through: 'MyPrize',
      foreignKey: 'PrizeId',
      as: 'users'
    });
  };

  return Prize;
};
