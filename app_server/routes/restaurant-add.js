var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.restaurantAdd);

module.exports = router;