const express = require('express');
const router = express.Router();
const {Category} = require('../models');

router.get('/', async(req, res, next)=>{
  try{
    const categories = await Category.findAll({
      attributes: ['id', 'content'],
      order: [['content', 'ASC']]
    });
    res.status(200).json(categories);
  } catch(err){console.error(err); next(err);}
})

module.exports = router;