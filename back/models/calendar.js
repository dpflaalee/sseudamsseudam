module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true,
  });
  // 관계 설정이 없으면 이 부분 생략
  // Calendar.associate = (db) => {};
  return Calendar;
};