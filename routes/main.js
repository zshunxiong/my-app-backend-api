const express = require('express');
const router = express.Router();

// Controllers - aka, the db queries 資料庫語法
const main = require('../controllers/main')

// App Routes - API路徑
router.get('/', (req, res) => res.send('hello world'));
router.post('/login', (req, res) => main.login(req, res));
router.post('/register', (req, res) => main.register(req, res));

module.exports = router;
