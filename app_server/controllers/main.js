/* GET home page. */
const mongoose = require('mongoose');
const Restaurant = mongoose.model('restaurant');

const request = require("request");

var index = (req, res) => {
    res.render('index', { title: 'Dobrodošli' });
};

var login = (req, res) => {
    res.render('Login', {registerPage: 'register'});
};

var register = (req, res) => {
    res.render('Register');
};


let userMAIL = "janez.novak@fri.uni-lj.si";
let userID = "5ded6bbb0edcf02af01f918e";

var userProfile = (req, res) => {

    let commentsURL = req.protocol + '://' + req.get('host') + "/api/commentAuthor/";
    const userURL = req.protocol + '://' + req.get('host') + "/api/uporabniki/" + userMAIL;

    request.get(userURL, (error, response, body) => {
        let user = JSON.parse(body);
        userID = user[0]._id;
        commentsURL += userID;
        request(commentsURL, (error2, response2, body2) => {
            let comments = JSON.parse(body2);

            res.render('userInfoPage', {"comments": comments, "user": user[0]});
        });
    });

};
var userSetting = (req, res) => {
    res.render('userSetting', Object.assign({}, userJSON, commentJSON));
};

var commentPage = (req, res) => {

    const url = req.protocol + '://' + req.get('host') + "/api/commentsByRestaurantId/" + req.params.id;
    const urlRestaurant = req.protocol + '://' + req.get('host') + "/api/restaurants/" + req.params.id;
    request.get(url, (error, response, body) => {

        let comments = JSON.parse(body);

        for(var i=0; i<comments.length; i++) {
            comments[i].time = comments[i].date.toString().substring(11, 16);
            comments[i].date = comments[i].date.toString().substring(0, 10);
        }

        request.get(urlRestaurant, (error2, response2, body2) => {
            let restaurant = JSON.parse(body2);
            console.log("ddddd => " + userID);
            res.render('commentPage',
                {"title": "Comments",
                    "restaurantName": restaurant.name,
                    "restaurantID" : restaurant._id,
                    "comments": comments,
                    "userID": userID
                });
        });
    });
};

var restaurantJSON = require('../models/restaurant');
var restaurantView = (req, res) => {
    const url = req.protocol + '://' + req.get('host') + "/api/restaurants/" + req.params.id;

    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);

        res.render('restaurantView.hbs', { title: json.name, restaurant: json});
    });
};


var restaurantsJSON = require('../models/restaurants');
const restaurantList = (req, res) => {
    let url = '';
    if (req.query.name !== undefined ) {
        url = req.protocol + '://' + req.get('host') + "/api/search" + req.url;
    } else {
        url = req.protocol + '://' + req.get('host') + "/api/restaurants";
    }

    request.get(url, (error, response, body) => {

        let json = JSON.parse(body);

        res.render('restaurant-list',
            {"title": "Restaurant List",
                "restaurants": json
            });
    });
};

var adminOverview = (req, res) => {
    const url = req.protocol + '://' + req.get('host') + "/api/restaurants";
    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);

        res.render('admin_locations.hbs', {"locations": json});
    });
};


var adminLocations = (req, res) => {

    const url = req.protocol + '://' + req.get('host') + "/api/restaurants";
    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);

        res.render('admin_locations.hbs', {"locations": json});
    });
};

var adminRates = (req, res) => {
    res.render('admin_rates.hbs')
};

var adminComments = (req, res) => {
    const url = req.protocol + '://' + req.get('host') + "/api/comments";
    request.get(url, (error, response, body) => {

        let commentsJSON = JSON.parse(body);
        console.log("Rezultat: " + body);
        res.render('admin_comments.hbs', {"comments": commentsJSON});
    });
};


var adminUsers = (req, res) => {
    const url = req.protocol + '://' + req.get('host') + "/api/users";
    request.get(url, (error, response, body) => {
        let json = JSON.parse(body);
        res.render('admin_users', {"users": json});
    })
};

var adminWaitingList = (req, res) => {
    res.render('admin_waitingList');
};

var restaurantAdd = (req, res) => {
    res.render('restaurant-add.hbs');
};

var addRestaurant = (req, res) => {
    const url = req.protocol + '://' + req.get('host') + "/api/restaurantADD";
    request.get(url, (error, response, body) => {

        let json = JSON.parse(body);
        console.log("ADDED RESTAURANT!");
        //console.log(json);
        res.render('restaurant-add',
            {"title": "Restaurant",
                "restaurantName": req.body.inputRestaurantName
            });
    });
};

var database = (req, res) => {
    res.render('database', { title: 'Database' });
};



module.exports = {
    index,
    login,
    register,
    commentPage,
    restaurantView,
    restaurantList,
    userProfile,
    userSetting,
    adminOverview,
    adminLocations,
    adminRates,
    adminComments,
    adminUsers,
    adminWaitingList,
    restaurantAdd,
    database
};