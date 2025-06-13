'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Prizes', 'type');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Prizes', 'type', {
      type: Sequelize.ENUM('randombox', 'coupon'),
      allowNull: false,
      defaultValue: 'randombox'
    });
  }
};
