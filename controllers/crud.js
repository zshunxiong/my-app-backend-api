// 載入資料坤連線資料
const pool = require('../config');

const getTableData = (req, res) => {
  pool.query('SELECT * FROM people')
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

const postTableData = (req, res) => {
  const { name, age, email } = req.body;
  const added = new Date()
  pool('people').insert({ name, age, email, added })
    .returning('*')
    .then((item) => {
      res.json({
        success: true,
        data: item
      })
    })
    .catch((err) => {
      let msg = '';
      if (err.code === "22P02") {
        msg = '欄位格式錯誤';
      } else if (err.code === "23505") {
        msg = 'E-Mail已被使用';
      }
      res.status(400).json({
        success: false,
        msg: msg,
        error: err
      })
    })
}

const delTableData = (req, res) => {
  const { id } = req.body
  pool('people').where({ id }).del()
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
  delTableData
}