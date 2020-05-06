const getTableData = (req, res, db) => {
  db.select('*').from('people')
    .then((items) => {
      res.json({
        success: true,
        data: items
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      msg: '資料庫錯誤',
      error: err
    }))
}

const postTableData = (req, res, db) => {
  const { name, age, email } = req.body;
  const added = new Date()
  db('people').insert({ name, age, email, added })
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

const delTableData = (req, res, db) => {
  const { id } = req.body
  db('people').where({ id }).del()
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