const mongoose = require('mongoose');
var url  = require('url');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const Restaurant = mongoose.model('restaurant');
const Comments = mongoose.model('comments');

const dodajRestavracijo = (req, res) => {
    let student = req.body.student;

    //console.log(req.body);

    /*if (!req.body.icon || Object.keys(req.body.icon).length === 0 || !req.body.front || Object.keys(req.body.front).length === 0) {
        console.log("Oh snap, no files were uploaded.");
        return res.status(400).send('No files were uploaded.');
    }*/

    let monday = req.body.timeTable.monday;
    let tuesday = req.body.timeTable.tuesday;
    let wednesday = req.body.timeTable.wednesday;
    let thursday = req.body.timeTable.thursday;
    let friday = req.body.timeTable.friday;
    let saturday = req.body.timeTable.saturday;
    let sunday = req.body.timeTable.sunday;
    console.log("timeTable");
    let commentSection = new Comments([]);
    let restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        rating: 0,
        mealPrice: req.body.mealPrice,
        student: student,
        studentPrice: req.body.studentPrice,
        timeTable: {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        },
        description: req.body.description,
        comments: commentSection,
        icon: '',
        front: '',
    });
    console.log("objekt");
    console.log(restaurant._id);
    console.log("C:/Users/Žiga/Desktop/asciiLetters.bmp");

    restaurant.save((err, rez) => {
        if (err) res.status(400).json(err);
        else {
            console.log(rez);
            return res.status(200).json(rez);
        }
    });

};

const readRestaurants = (req, res) => {
    Restaurant
        .find()
        .exec((error, restaurant) => {
                if(!restaurant)
                    return res.status(404).json({
                        "error": "Restaurants not found"
                    });
                else if (error)
                    return res.status(500).json(error);
                else
                    res.status(200).json(restaurant);
            })
};

const deleteRestaurant = (req, res) => {

    //console.log(req.body);

    var id = req.body.restaurantID.toString();
    var ObjectID = mongoose.Types.ObjectId;

    Restaurant.deleteOne(
        {"_id": ObjectID(id)}, function (error, result) {
            if(error) return res.status(404).json(error);
            else res.status(204);
        }
    );
};

const deleteRestaurantByID = (req, res) => {
    let id = req.params.id;
    let ObjectID = mongoose.Types.ObjectId;

    Restaurant.deleteOne(
        {"_id": ObjectID(id)}, function (error, result) {
            if(error) return res.status(404).json(error);
            else return res.status(204);
        }
    );
};

const updateResturant = (req, res) => {

    var id = req.body.restaurantID.toString();
    var ObjectID = (mongoose.Types.ObjectId);

    Restaurant.updateOne({"_id": ObjectID(id)}, {$set:
            {

            }
    }, function (error, result) {
        if(err)
            return res.status(500).json(error);
        else
            res.redirect(res.body.returnADR.toString());
    });
};

const getRestaurantById = (req, res) => {
    Restaurant.findOne({_id: req.params.id}).exec((error, restaurant) => {
        if(!restaurant)
            res.status(404).json({
                "error": "Restaurants not found"
            });
        else if (error)
            res.status(500).json(error);
        else
            res.status(200).json(restaurant);
    })
};

const getRestaurantBySearch = (req, res) => {
    var name = req.params.name;

    console.log(name)

    const regex = new RegExp(name, 'i')

    Restaurant.find({name: { $regex: regex }}).exec((error, restaurant) => {
        if(!restaurant)
            return res.status(404).json({
                "error": "Restaurants not found"
            });
        else if (error)
            return res.status(500).json(error);
        else{
            res.status(200).json(restaurant);
        }
    })
};

module.exports = {
    dodajRestavracijo,
    readRestaurants,
    deleteRestaurant,
    updateResturant,
    getRestaurantById,
    getRestaurantBySearch,
    deleteRestaurantByID
};