const express = require('express');
const {isLoggedIn} = require('./middlewares');
const {Group, Category, User, OpenScope, GroupMember, GroupRequest} = require('../models');

const router = express.Router();

//1. 그룹 불러오기
router.get('/', isLoggedIn, async(req, res, next)=>{
  try{
    const groups = await Group.findAll({
      include: [
        { model:Category, through: {attributes:[]} }
       ,{ model: OpenScope, attributes: ['id', 'content'] }
       ,{ model : User, as: 'groupmembers', attributes: ['id'], through: {attributes:[]} }
      ],
      order: [[ 'createdAt', 'DESC' ]]
    });
    res.status(200).json(groups);
  }catch(error){  
    console.error('Error details:', error);  
    console.error('Error message:', error.message);  
    console.error('Error stack:', error.stack); next(error);}
});

//2. 그룹생성
router.post('/', isLoggedIn, async(req, res, next)=>{
  try{
    const { title, content, openScopeId, categoryIds } = req.body;

    const group = await Group.create({
      title , content , openScopeId: openScopeId
    });

    if(categoryIds && categoryIds.length > 0){ await group.setCategories(categoryIds); }

    await GroupMember.create({ GroupId: group.id, UserId: req.user.id, isLeader: true });
    const fullGroup = await Group.findByPk(group.id, {
      include: [
        { model: Category, through: {attributes:[]} }
       ,{ model: OpenScope, attributes: ['id', 'content'] }
      ]
    });

    res.status(201).json(fullGroup);
  }catch(error){console.error(error); next(error);}
});

//3. 그룹 수정
router.patch('/:groupId', isLoggedIn, async(req,res,next)=>{
  try{
    const {groupId} = req.params;
    const {title, content, openScopeId, categoryIds} = req.body;

    const group = await Group.findByPk(groupId);

    if(!group){return res.status(404).send('그룹이 존재하지 않습니다.')};

    //방장 권한 추후 체크
    await group.update({
      title, content, openScopeId: openScopeId
    });

    if( categoryIds && categoryIds.length>0 ){await group.setCategories(categoryIds);}
    
    const updateGroup = await Group.findByPk(groupId, {
      include:[
        { model:Category, through: {attributes:[]} }
       ,{ model: OpenScope, attributes: ['id', 'content'] }
      ]
    });
    res.status(200).json(updateGroup);
  }catch(error){console.error(error); next(error);}
});

// 4. 그룹 삭제
router.delete('/:groupId', isLoggedIn, async(req,res,next)=>{
  try{
    const {groupId} = req.params;
    const group = await Group.findByPk(groupId);

    if(!group){return res.status(404).send('그룹이 존재하지 않습니다.');}

    await group.destroy();
    res.status(200).json({groupId})
  }catch(error){console.error(error); next(error);}
});

//멤버관리----------------------------------------------------------------
//1. 멤버 불러오기
router.get('/:groupId/members', async(req, res, next)=>{
  try{
    const members = await User.findAll({
      include: [{ model: Group, as: `groupmembers`, where: {id: req.params.groupId},  through: {attributes: ['isLeader'], model: GroupMember } }],
      attributes:['id', 'nickname', 'email']
    });
    //멤버 데이터 가공
    const formatted = members.map(member=>{
      const gm=member.groupmembers[0].GroupMember;
      return{id: member.id, nickname: member.nickname, email: member.email, isLeader: gm.isLeader};
    });
    res.status(200).json(formatted);
  }catch(error){console.error(error); next(error);}
});

/*//1-1 특정 유저 정보 가져오기
router.get('/:groupId/members/:userId', async(req,res,next)=>{
  try{
    const member = await User.findOne({
      where: { id: req.params.userId },
      include: [{
        model: Group, as: 'groupmembers', where: {id: req.params.groupId}, through: { attributes: ['isLeader'], model: GroupMember }
      }],
      attributes: ['id', 'nickname', 'email']
    });
    if(!member){ return res.status(404).json({message: 'Member not Found'});}

    const formatted = { id:member.id, nickname: member.nickname, email: member.email, isLeader: member.groupmembers[0].GroupMember.isLeader};
    res.status(200).json(formatted);
  }catch(error){console.error(error); next(error);}
});*/

//2. 강퇴
router.delete('/:groupId/members/:userId', async(req,res,next)=>{
  try{
    await GroupMember.destroy({ where: { GroupId: req.params.groupId, UserId: req.params.userId } });
    res.status(200).json({success:true});
  }catch(error){console.error(error); next(error);}
});

//3. 권한 위임
router.patch('/:groupId/members/:userId/transfer', async(req,res,next)=>{
  try{
    //기존리더 제거
    await GroupMember.update(
      {isLeader: false},
      {where: {GroupId:req.params.groupId, isLeader:true}}
    )
    //새 리더 지정
    await GroupMember.update(
      {isLeader: true},
      {where:{GroupId: req.params.groupId, UserId: req.params.userId}}
    );
    res.status(200).json({userId: parseInt(req.params.userId, 10)})
  }catch(err){console.error(err); next(err);}
})

//가입관리----------------------------------------------------------------
// 로그인한 사용자 정보 (passport.js 등을 통해 세션에 저장된 정보)
/*router.get('/:groupId/members/me', isLoggedIn, async (req, res, next) => {
  try {
    const me = req.user;  
    const member = await User.findOne({
      where: { id: me.id },
      include: [{
        model: Group,
        as: 'groupmembers',
        where: { id: req.params.groupId },
        through: { attributes: ['isLeader'], model: GroupMember }
      }],
      attributes: ['id', 'nickname', 'email']
    });

    if (!member) { return res.status(404).json({ message: 'You are not a member of this group' }); }

    const formatted = { id: member.id, nickname: member.nickname, email: member.email, isLeader: member.groupmembers[0].GroupMember.isLeader };

    res.status(200).json(formatted);
  } catch (error) {console.error(error); next(error);}
});*/

//1. 즉시가입
router.post('/:groupId/join', isLoggedIn, async(req,res,next)=>{
  console.log("그룹 라우터 데이터 잘 받아오고 있나요---------:", req.params.groupId);
  try{
    const group = await Group.findByPk(req.params.groupId);
    if(!group){return res.status(404).send('그룹을 찾을 수 없습니다.');}

    const existingMember = await GroupMember.findOne({where:{GroupId:group.id, UserId:req.user.id}});
    if(existingMember){return res.status(400).send('이미 가입된 그룹입니다.');}

    //공개 여부 조건 체크
    if(group.OpenScopeId !== 1){return res.status(403).send('가입에 실패했습니다.'); }

    await GroupMember.create({ GroupId: group.id, UserId: req.user.id, isLeader: false, });
    
    res.status(200).send('그룹 가입에 성공하였습니다.');
  }catch(err){console.error(err); next(err)}
});

//2. 비공개 그룹 가입
router.post('/:groupId/apply', isLoggedIn, async(req, res, next)=>{
  try{
    const group = await Group.findByPk(req.params.groupId);
    if(!group){ return res.status(404).send('그룹을 찾을 수없습니다.') }

    if(group.OpenScopeId===1){ return res.status(400).send('공개 그룹에는 가입 신청이 필요 없습니다.') }

    //기존가입신청확인
    const existingRequest = await GroupRequest.findOne({
      where: { GroupId: group.id, UserId: req.user.id, status: 'pending' }    });
    if(existingRequest) {return res.status(400).send('이미 가입 신청이 전송되었습니다.');}
    
    //새 가입신청 만들기
    await GroupRequest.create({ GroupId: group.id, UserId: req.user.id, status: 'pending' });
    res.status(200).send('가입 신청이 전송되었습니다.');
  }catch(err){console.error(err); next(err);}
})

// -- 
// 1.가입신청현황
router.get('/:groupId/requests', async(req,res,next)=>{
  try{
    const requests = await GroupRequest.findAll({
      where: { GroupId: req.params.groupId, status:'pending'},
      include: [{ model: User, attributes: ['id', 'nickname'] }]
    });
    const formatted = requests.map((r) => ({  id: r.id,  nickname: r.User.nickname,  status: r.status, }));
    res.status(200).json(formatted);
  }catch(err){console.error(err); next(err);}
})

// 2. 승인
router.post('/requests/:requestId/approve', isLoggedIn, async (req, res, next) => {
  const { requestId } = req.params;
  const { userId } = req.query;  // 쿼리 스트링에서 userId를 받는다.
  console.log("....................Router 요청아이디", requestId);
  console.log("....................Router 유저아이디", userId);

  try {
    const request = await GroupRequest.findOne({
      where: {
        id: requestId,     // 요청 ID
        UserId: userId,    // userId와 비교
        status: 'pending', // 승인 대기 중인 상태
      },
    });

    if (!request) {
      return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    }

    request.status = 'approved';  // 승인 처리
    await request.save();

    res.status(200).json({ message: '승인되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

// 3. 거절
router.post('/requests/:requestId/reject', isLoggedIn, async (req, res, next) => {
  const { requestId } = req.params;
  const { userId } = req.query;  // 쿼리 스트링에서 userId를 받는다.
  console.log("....................Router 요청아이디", requestId);
  console.log("....................Router 유저아이디", userId);

  try {
    const request = await GroupRequest.findOne({
      where: {
        id: requestId,     // 요청 ID
        UserId: userId,    // userId와 비교
        status: 'pending', // 거절 대기 중인 상태
      },
    });

    if (!request) {
      return res.status(404).json({ message: '요청을 찾을 수 없습니다.' });
    }

    request.status = 'rejected';  // 거절 처리
    await request.save();

    res.status(200).json({ message: '거절되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
});

module.exports = router;