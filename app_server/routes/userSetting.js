var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET users listing. */

router.get('/', ctrlMain.userSetting);

module.exports = router;
