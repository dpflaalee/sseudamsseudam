module.exports = ( sequelize , DataTypes ) => {
  const Group = sequelize.define('Group',{
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Group.associate = (db) => {
    db.Group.hasOne(db.OpenScope);
    db.Group.hasMany(db.Post);
  };
  return Group;
};