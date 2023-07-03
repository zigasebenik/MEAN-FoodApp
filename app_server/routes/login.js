var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
const request = require("request");


/* GET users listing. */

router.get('/', ctrlMain.login);

router.post('/check', function (req, res) {

    console.log("/api/uporabniki/"+req.body.email);

    const url = "http://localhost:3000/api/uporabniki/"+req.body.email;
    request.get(url, (error, response, body) => {

        let json = JSON.parse(body);
        /*console.log(json);
        console.log(json[0].email);
        console.log(json.size())
        console.log(json.size)*/

        if(json && json.length)
            if(json[0].email == req.body.email && json[0].passwd == req.body.passwd)
            {
                res.redirect("/");
            }
            else
                res.status(401).send("Wrong Email or Password");
    });

});

module.exports = router;
