const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {} ;  // 객체 생성하여 객체저장공간 만들기

const sequelize = new Sequelize(config.database , config.usrename, config.password, config);
//db, username, password, cinfig 설정정보 이용하여 인스턴스 생성

//#모델정의
db.User = require('./user_2')(sequelize , Sequelize);
db.Post = require('./post_2')(sequelize , Sequelize); 
db.Image = require('./image_2')(sequelize , Sequelize); 
db.Hashtag = require('./hashtag_2')(sequelize , Sequelize); 
db.Comment = require('./comment_2')(sequelize , Sequelize);
db.OpenScope = require('./openscope_2')(sequelize , Sequelize);
db.Place = require('./place_2')(sequelize , Sequelize);
db.Group = require('./group_2')(sequelize , Sequelize);
//#모델 관계설정
Object.keys(db).forEach( modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; //인스턴스
db.Sequelize = Sequelize; //라이브러리 db객체에 저장

module.exports = db; // 타 파일에서도 db 사용가능하게