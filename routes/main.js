const express = require('express');
const router = express.Router();

// App Routes - API路徑
router.get('/', (req, res) => res.send('hello world'));

module.exports = router;
