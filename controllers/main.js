const pool = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltingRounds = 10;

const register = (req, res) => {
  // 取得前端註冊的值
  const { account, password } = req.body;
  // 將密碼加密儲存
  bcrypt.hash(password, saltingRounds, (err, hash) => {
    if (err) {
      let msg = 'Error hashing password for user';
      res.json({
        success: false,
        msg: msg,
        error: err
      })
    } else {
      const added = new Date()
      pool.query('INSERT INTO admin (account,password,added) VALUES ($1,$2,$3)', [account, hash, added])
        .then((items) => {
          res.json({
            success: true,
            data: items[0]
          })
        })
        .catch((err) => {
          let msg = '';
          if (err.code === "23505") {
            msg = '帳號已被使用';
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
  })
}

const login = (req, res) => {
  const { account, password } = req.body;
  // 查詢資料庫是否有這個帳號
  pool.query('SELECT * FROM admin WHERE account=$1', [account])
    .then((items) => {
      if (items.rows.length > 0) {
        // 查到該賬號後要將密碼 加密對比
        let itemFounded = items.rows[0];
        bcrypt.compare(password, itemFounded.password).then(match => {
          if (match) {
            // 回傳到前端的密碼要拿掉
            delete itemFounded.password;
            // 創建 JWT (Json Web Token)
            const payload = { data: itemFounded };
            const options = { expiresIn: '1h', issuer: process.env.APP_URL };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);
            res.json({
              success: true,
              data: {
                token: token
              }
            })
          } else {
            res.json({
              success: false,
              msg: '密碼錯誤',
            })
          }
        });
      } else {
        res.json({
          success: false,
          msg: '查無此帳號',
        })
      }
    })
    .catch((err) => {
      let msg = '資料庫錯誤';
      res.status(400).json({
        success: false,
        msg: msg,
        error: err
      })
    })
}

module.exports = {
  register,
  login
}