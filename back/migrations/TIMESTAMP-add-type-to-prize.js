module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Prizes', 'type', {
      type: Sequelize.ENUM('randombox', 'coupon'),
      allowNull: false,
      defaultValue: 'randombox',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Prizes', 'type');
  }
};
