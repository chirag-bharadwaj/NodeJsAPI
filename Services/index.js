const express = require('express');
const router = express.Router();

router.use('/api', require('./userService'))


module.exports = router;