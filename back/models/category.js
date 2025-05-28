module.exports = (sequelize,DataTypes) => {
  const Category = sequelize.define('Category',{
    content: {
      type: DataTypes.STRING(30),
      allowNull: false,      
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Category.associate = (db) => {
    db.Category.belongsToMany( db.Post, { through: 'PostCategory', as:'Posts' });
  };  
  return Category;
};