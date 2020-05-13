const express = require('express');
const router = express.Router();
// 引用 JWT 認證方法
const validateToken = require('../utils').validateToken;
// Controllers - aka, the db queries 資料庫語法
const crud = require('../controllers/crud')

// App Routes - API路徑
router.get('/', validateToken, (req, res) => crud.getTableData(req, res));
router.post('/', validateToken, (req, res) => crud.postTableData(req, res));
router.put('/', validateToken, (req, res) => crud.putTableData(req, res));
router.delete('/', validateToken, (req, res) => crud.delTableData(req, res));

module.exports = router;
