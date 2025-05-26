module.exports = ( sequelize , DataTypes ) => {
  const OpenScope = sequelize.define('OpenScope',{
    content: DataTypes.STRING(30),
    allowNull: false,
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  OpenScope.associate = (db) => {
    db.OpenScope.hasOne(db.Post);
    db.OpenScope.hasOne(db.Group);
  };
  return OpenScope;
};