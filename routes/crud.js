const express = require('express');
const router = express.Router();

// Controllers - aka, the db queries 資料庫語法
const crud = require('../controllers/crud')

// App Routes - API路徑
router.get('/', (req, res) => crud.getTableData(req, res));
router.post('/', (req, res) => crud.postTableData(req, res));
router.put('/', (req, res) => crud.putTableData(req, res));
router.delete('/', (req, res) => crud.delTableData(req, res));

module.exports = router;
