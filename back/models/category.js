module.exports=(sequelize, DataTypes)=>{
  const Category = sequelize.define('Category',{
    content:{
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },{
    charset:'utf8',
    collate:'utf8_general_ci'
  });

  Category.associate = (db)=>{
    db.Category.belongsToMany(db.Group, {through:'Group_has_Category', as:''});
    // db.Category.hasMany(db.Group);
    //db.Category.belongsToMany(db.Prize, {through:'Prize_has_Category', as:''});
    db.Category.hasMany(db.Prize);
    db.Category.hasMany(db.Animal);
    db.Category.belongsToMany(db.Post, {through:'Post_has_Category',as:''});
    //db.Category.hasMany(db.Post);
  }
  return Category;
}

/*
카테고리:상품 다대다
카테고리:그룹 다대다
카테고리:동물 다대다
카테고리:게시글 다대다
 */

