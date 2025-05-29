module.exports = ( sequelize , DataTypes ) => {
  const Place = sequelize.define('Place',{
    address: {
      type: DataTypes.STRING(50),
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return Place;
};