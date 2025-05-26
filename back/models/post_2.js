module.exports = ( sequelize , DataTypes ) => {
  const Post = sequelize.define('Post',{
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  Post.associate = (db) => {
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.hasOne(db.OpenScope);
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Group);
    db.Post.belongsTo(db.Post, {as: 'Retweet'});
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'});
    db.Post.belongsToMany(db.Category, {through: 'PostCategory', as: 'Categorys'})
  };
  return Post;
};