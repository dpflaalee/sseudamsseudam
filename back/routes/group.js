const express = require('express');
const {isLoggedIn} = require('./middlewares');
const {Group, Category, User, OpenScope} = require('../models');

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
  }catch(error){console.error(error); next(error);}
});

//2. 그룹생성
router.post('/', isLoggedIn, async(req, res, next)=>{
  try{
    const { title, content, openScopeId, categoryIds } = req.body;

    const group = await Group.create({
      title , content , openScopeId: openScopeId
    });

    if(categoryIds && categoryIds.length > 0){ await group.setCategories(categoryIds); }

    await group.addGroupmember(req.user.id); // 생성자 그룹에 자동 참여
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

module.exports = router;