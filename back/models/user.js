module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  User.associate = (db) => {
    //일 대 다 
    //Notification
    db.User.hasMany(db.Notification, { foreignKey: 'SenderId', as: 'SentNotifications', });
    db.User.hasMany(db.Notification, { foreignKey: 'ReceiverId', as: 'ReceivedNotifications', });
    db.User.hasMany(db.NotificationSetting, {
      foreignKey: 'UserId',
      as: 'NotificationSettings',
      onDelete: 'CASCADE',
    });

    // Complain
    db.User.hasMany(db.Complain, { foreignKey: 'ReporterId' });

    //Animal
    db.User.hasMany(db.Animal);
    //Post
    db.User.hasMany(db.Post);
    //Chatting
    db.User.hasMany(db.Chatting);
    //Comment
    db.User.hasMany(db.Comment);
    //BlackList
    db.User.hasMany(db.BlackList);

    /// 다 대 다 
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    //  Follow 테이블에서 팔로우하는사람 (FollowingId) 을 기준으로 관계설정 - 팔로우하는 사람 ID
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
    //                                                      user.getFollowings()
    //MyPrize
    db.User.belongsToMany(db.Prize, { through: 'MyPrize', foreignKey: 'UserId' });
    //UserGroup
    db.User.belongsToMany(db.Group, { through: 'GroupMember', as: 'groupmembers', foreignKey: 'UserId' }); // 중간테이블 별칭 추가
    //MyPlace
    db.User.belongsToMany(db.Place, { through: 'MyPlace', as: 'Places' });
    //ChattingMemebers
    db.User.belongsToMany(db.ChattingRoom, { through: db.ChattingMember, foreignKey: 'UserId' });


  };
  return User;
};