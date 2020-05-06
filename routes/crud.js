const express = require('express');
const db = require('../config');
const router = express.Router();

// Controllers - aka, the db queries 資料庫語法
const crud = require('../controllers/crud')

// App Routes - API路徑
router.get('/', (req, res) => crud.getTableData(req, res, db));
router.post('/', (req, res) => crud.postTableData(req, res, db));
router.put('/', (req, res) => crud.putTableData(req, res, db));
router.delete('/', (req, res) => crud.delTableData(req, res, db));

module.exports = router;
