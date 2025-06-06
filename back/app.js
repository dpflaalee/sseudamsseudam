const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const passportConfig = require('./passport');
const passport = require('passport');
const path = require('path'); //파일업로드 경로설정

const dotenv = require('dotenv'); //환경변수 로그
const morgan = require('morgan'); //요청상태 모니터

const user = require('./routes/user');
const post = require('./routes/post');
const posts = require('./routes/posts');
const hashtag = require('./routes/hashtag');
const complain = require('./routes/complain');
const admin = require('./routes/admin');
const search = require('./routes/search');
const notification = require('./routes/notification');
const animal = require('./routes/animal');

//환경설정
dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // 쿠키 등 인증정보 포함 요청 허용
}));

//db연동
const db = require('./models');
db.sequelize
  .sync()
  .then(() => { console.log('..........db'); })
  .catch(console.error);
passportConfig();

//기타 연동
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // 요청 본문파싱
app.use(express.urlencoded());

app.use(express.json({limit: '20mb'})); // 요청 본문파싱
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: { secure: false }  //  production 에서 true
}));
app.use(passport.initialize()); // 인증처리 라이브러리 초기화
app.use(passport.session()); //사용자 인증상태 저장

//TEST
app.get('/', (req, res) => { res.send('Express Test'); });
app.use('/api', (req, res) => { res.send('Link Test') });
//app.use('/detail' , detail);

app.use('/post', post);
app.use('/posts', posts);
app.use('/hashtag', hashtag);
app.use('/user', user);
app.use('/complain', complain);
app.use('/admin', admin);
app.use('/search', search);
app.use('/notification', notification);
app.use('/animal', animal);
app.use('/uploads/animalProfile', express.static(path.join(__dirname, 'animalProfile')));

app.listen(3065, () => { console.log('server...'); });