// 載入資料庫連線資料
const pool = require('../config');

const getTableData = (req, res) => {
  pool.query('SELECT * FROM people ORDER BY id')
    .then((items) => {
      res.json({
        success: true,
        data: items.rows
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      msg: '資料庫錯誤',
      error: err
    }))
}

const putTableData = (req, res) => {
  const { id, name, age, email } = req.body;
  const added = new Date()
  pool.query('UPDATE people SET name=$2,age=$3,email=$4,added=$5 WHERE id=$1', [id, name, age, email, added])
    .then((items) => {
      res.json({
        success: true,
        data: items[0]
      })
    })
    .catch((err) => {
      let msg = '';
      if (err.code === "22P02") {
        msg = '欄位格式錯誤';
      } else if (err.code === "23505") {
        msg = 'E-Mail已被使用';
      } else {
        msg = '資料庫錯誤';
      }
      res.status(400).json({
        success: false,
        msg: msg,
        error: err
      })
    })
}

const postTableData = (req, res) => {
  const { name, age, email } = req.body;
  const added = new Date()
  pool.query('INSERT INTO people (name,age,email,added) VALUES ($1,$2,$3,$4)', [name, age, email, added])
    .then((items) => {
      res.json({
        success: true,
        data: items[0]
      })
    })
    .catch((err) => {
      let msg = '';
      if (err.code === "22P02") {
        msg = '欄位格式錯誤';
      } else if (err.code === "23505") {
        msg = 'E-Mail已被使用';
      } else {
        msg = '資料庫錯誤';
      }
      res.status(400).json({
        success: false,
        msg: msg,
        error: err
      })
    })
}

const delTableData = (req, res) => {
  const { id } = req.body;
  pool.query('DELETE FROM people WHERE id = $1', [id])
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      msg: '資料庫錯誤',
      error: err
    }))
}

module.exports = {
  getTableData,
  postTableData,
  delTableData,
  putTableData
}