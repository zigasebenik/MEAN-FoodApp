require('dotenv').config();
var passport = require('passport');
var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
require('./app_api/models/db');
require('./app_api/konfiguracija/passport');
require('./app_api/models/restaurants');
const bodyParser = require("body-parser");



var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");


var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "FriFood",
      version: "1.0.0",
      description: "FriFood REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://frifood-2019.herokuapp.com/api" }
    ]
  },
  apis: [
    "./app_api/models/comments.js",
    "./app_api/models/uporabnikSchema.js",
    "./app_api/models/restaurants.js",
    "./app_api/models/analytics.js",
    "./app_api/routes/index.js"
  ]
};


const swaggerDocument = swaggerJsdoc(swaggerOptions);


//var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');
// var loginRouter = require('./app_server/routes/login');
//
// var registerRouter = require('./app_server/routes/register');
// var commentPageRouter = require('./app_server/routes/commentPage');
// var restaurantViewRouter = require('./app_server/routes/restaurantView');
// var restaurantListRouter = require('./app_server/routes/restaurant-list');
// var userProfileRouter = require('./app_server/routes/userProfile');
// var userSettingRouter = require('./app_server/routes/userSetting');
//
// var adminOverviewRouter = require('./app_server/routes/adminOverview');
// var adminLocationsRouter = require('./app_server/routes/adminLocations');
// var adminRatesRouter = require('./app_server/routes/adminRates');
// var adminCommentsRouter = require('./app_server/routes/adminComments');
// var adminUsersRouter = require('./app_server/routes/adminUsers');
// var adminWaitinglistRouter = require ('./app_server/routes/adminWaitingList');
//
// var restaurantAddRouter = require('./app_server/routes/restaurant-add');
//
var databaseRouter = require('./app_server/routes/database');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
hbs.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

require('./app_server/views/helpers/handlebar-helpers.js');
require('./public/javascripts/restaurant-list-helper');

app.use(bodyParser.json());
app.use(fileUpload());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use(passport.initialize());

app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  //res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  next();
});

// Odprava varnostnih pomanjkljivosti
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Odprava tezav s CSP
const csp = require('express-csp-header');
app.use(csp({
  policies: {
    'default-src': [csp.SELF],
    'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
    'style-src': [csp.SELF, 'mystyles.net'],
    'img-src': ['data:', 'images.com'],
    'worker-src': [csp.NONE],
    'block-all-mixed-content': true
  }
}));

/*app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});*/
var options = {
  explorer: false
};
app.use('/api', indexApi);

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

//app.use('/', indexRouter);
//
// app.use('/login', loginRouter);
// app.use('/loginCheck', loginRouter);
//
// app.use('/register', registerRouter);
//
// app.use('/commentPage', commentPageRouter);
// app.use('/addComment', commentPageRouter);
//
// app.use('/restaurantView', restaurantViewRouter);
//
// app.use('/restaurant-list', restaurantListRouter);
// app.use('/profile', userProfileRouter);
// app.use('/userSetting', userSettingRouter);
//
// app.use('/admin', adminOverviewRouter);
// app.use('/admin-locations', adminLocationsRouter);
// app.use('/admin-rates', adminRatesRouter);
// app.use('/admin-comments', adminCommentsRouter);
// app.use('/users', adminUsersRouter);
// app.use('/admin-waitinglist', adminWaitinglistRouter);
//
// app.use('/restaurant-add', restaurantAddRouter);
//app.use('/restaurantData', restaurantAddRouter);

app.use('/db', databaseRouter);

app.post('/restaurantData', function(req, res){
  var data = req.body;
  let template = hbs.compile(data.param2);
  //console.log(data.param1);
  res.send(template({foundRestaurant: data.param1}));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
module.exports.swaggerOptoins = swaggerOptions;
