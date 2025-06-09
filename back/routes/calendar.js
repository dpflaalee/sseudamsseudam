const express = require('express');
const router = express.Router();

const { Calendar } = require('../models');  // models/index.js에서 불러오기

// 일정 전체 조회
router.get('/', async (req, res, next) => {
  try {
    const calendars = await Calendar.findAll();
    res.json(calendars);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// # 일정 생성
router.post('/', async (req, res, next) => {
    console.log('................. /calendar' );
    console.log( req.body );
  try {
    const { title, content, startDate, endDate } = req.body;
    console.log('........💡 요청 바디:', req.body);
    const newCalendar = await Calendar.create({
      title,
      content,
      startDate,
      endDate,
    });
    console.log('✅ 생성 성공:', newCalendar.toJSON());
    res.status(201).json(newCalendar);
  } catch (error) {
    console.error('❌ 일정 생성 실패:', error);
    res.status(500).json({ message: '일정 생성 실패', error });
    //next(error);
  }
});

// 일정 상세 조회 (id로)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Calendar.findByPk(id); // db.Schedule → db.Calendar로 수정 필요
    if (!schedule) {
      return res.status(404).json({ error: '일정이 존재하지 않습니다.' });
    }
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 일정 수정
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, startDate, endDate } = req.body;
    const calendar = await Calendar.findByPk(req.params.id);
    if (!calendar) {
      return res.status(404).json({ message: '일정을 찾을 수 없습니다.' });
    }
    await calendar.update({ title, content, startDate, endDate });
    res.json(calendar);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 일정 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    const calendar = await Calendar.findByPk(req.params.id);
    if (!calendar) {
      return res.status(404).json({ message: '일정을 찾을 수 없습니다.' });
    }
    await calendar.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
