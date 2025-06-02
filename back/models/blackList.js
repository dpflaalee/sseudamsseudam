module.exports = (  sequelize , DataTypes   ) => { 
  /// const User
  const BlackList = sequelize.define('BlackList', {//users테이블  - 자동으로 s 붙어서 생성
    //id 기본값으로 자동설정
    blackId: {
      type: DataTypes.INTEGER, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique : true ,  // 고유값
    }
  }, {
    charset : 'utf8', 
    collate: 'utf8_general_ci',  // 한글저장   
  });  
  /// 관계설정
  BlackList.associate = (db) => { 

    db.BlackList.belongsTo(db.User);
  }; 
  return BlackList;
};