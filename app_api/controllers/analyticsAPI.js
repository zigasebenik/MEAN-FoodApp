const mongoose = require('mongoose');
const Analytics = mongoose.model('analytics');

const returnAnalytics = (req, res) => {
    Analytics
        .find()
        .exec((error, analytics) => {
            if (!analytics) {
                return res.status(404).json({
                    "error": "Analytics were not found"
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            res.status(200).json(analytics);
        });
};


const updateAnalyticsByName = (req, res) => {
    let name = req.body.name;
    console.log(name);
    Analytics.findOneAndUpdate({ name: name },
        { $inc: {'numOfVisits': 1 } },
        {upsert: true },
        function (error, result) {
        if (error)
            return res.status(500).json(error);
        else {
            res.status(200).json(result);
        }
    });
};

module.exports = {
    returnAnalytics,
    updateAnalyticsByName
};