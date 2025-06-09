import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { title, content, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    return res.status(400).json({ message: '필수 항목이 누락되었습니다.' });
  }

  // MySQL 연결 설정 (본인 DB 정보로 변경)
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'uroot',
    password: '1234',
    database: 'ssdam',
  });

  try {
    const sql = `INSERT INTO calendars (title, content, startDate, endDate, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`;
    await connection.execute(sql, [title, content || '', startDate, endDate]);
    await connection.end();

    return res.status(201).json({ message: '일정 등록 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류 발생' });
  }
}
