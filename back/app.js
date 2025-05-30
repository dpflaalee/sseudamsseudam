const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//const passportConfig = require('./passport');
//const passport = require('passport');
//const path = require('path'); //파일업로드 경로설정

const dotenv = require('dotenv'); //환경변수 로그
const morgan =require('morgan'); //요청상태 모니터

//환경설정
dotenv.config();
const app = express();

//db연동
const db=require('./models');
//db.sequelize
//  .sync()
//  .then(()=>{console.log('..........db');})
//  .catch(console.error);
//passportConfig();

//기타 연동
app.use(morgan('dev'));
//app.use('/', express.static(path.join(__dirname,'uploads')));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials : true // 쿠키 등 인증정보 포함 요청 허용
}));
app.use(express.json()); // 요청 본문파싱
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized:false,
  resave:false,
  secret:process.env.COOKIE_SECRET
}));
//app.use(passport.initialize()); // 인증처리 라이브러리 초기화
//app.use(passport.session()); //사용자 인증상태 저장

//TEST
app.get('/', (req, res)=>{res.send('Express Test');});
app.get('/api', (req,res)=>{res.send('Link Test')});

app.listen(3065, ()=> {console.log('server...');} );