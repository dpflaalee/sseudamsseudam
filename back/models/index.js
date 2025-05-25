const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {} ;  // 객체 생성하여 객체저장공간 만들기

const sequelize = new Sequelize(config.database , config.usrename, config.password, config);
//db, username, password, cinfig 설정정보 이용하여 인스턴스 생성

//#모델정의
//#모델 관계설정

//db.sequelize = squelize; //인스턴스
db.Sequelize = Sequelize; //라이브러리 db객체에 저장

module.exports = db; // 타 파일에서도 db 사용가능하게