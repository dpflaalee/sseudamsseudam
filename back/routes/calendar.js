const express = require('express');
const router = express.Router();
const { Calendar } = require('../models');

router.post('/', async (req, res) => {
  try {
    const schedule = await axios.post('http://localhost:3065/api/schedule', {
      title: values.title,
      content: values.content,
      startDate: dayjs(start).toISOString(),
      endDate: dayjs(end).toISOString(),
  })
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
