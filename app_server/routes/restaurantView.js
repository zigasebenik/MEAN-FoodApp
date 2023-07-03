var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
const Restaurant = require("mongoose");
/* GET users listing. */

router.get('/:id', ctrlMain.restaurantView);

module.exports = router;
