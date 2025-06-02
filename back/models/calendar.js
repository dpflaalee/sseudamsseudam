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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> e5b0546 (calendar db model)
=======
>>>>>>> 6712fc9 (WIP: 로컬 변경사항 저장)
  return Calendar;
};
