// # middlewares.js
// 개발 중 로그인 우회
exports.isLoggedIn = (req, res, next) => {
  req.user = { id: 1 }; // ← 임시 사용자 ID
  next();               // 무조건 통과
};
// exports.isLoggedIn = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(401).send('로그인이 필요합니다.');
//   }
// };

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};  
   