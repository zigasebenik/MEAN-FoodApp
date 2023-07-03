const mongoose = require('mongoose');
const Uporabnik = mongoose.model('uporabniki');

const vrniUporabnika = (req, res) => {
    Uporabnik
        .findOne( { email: req.params.email.toString() }  )
        .exec((napaka, uporabnik) => {
            if (!uporabnik) {
                return res.status(404).json({
                    "error": "Ne najdem uporabnika"
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(uporabnik);
        });

};

const getUserById = (req, res) => {
    var userID = req.params.userID;


    console.log(req.params.userID)

    Uporabnik.findOne({"_id": userID}, function (error, user) {
        if (!user)
            return res.status(404).json({
                "error": "User not found"
            });
        else if (error)
            return res.status(500).json(error);
        else {
            return res.status(200).json(user);
        }
    })
};

const narediUporabnika = (req, res) => {

    console.log(req.headers.authorization);

    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var passwd1 = req.body.passwd1;
    var passwd2 = req.body.passwd2;


    console.log(name);

    if (name.length !== 0 && surname.length !== 0)
    {
        if(email.search("@") !== -1 && passwd1 === passwd2)
        {
            var user = new Uporabnik({
                name: name,
                surname: surname,
                email: email,
                admin: false
            });

            // save model to database
            user.save(function (err, rez) {
                if (err)
                    res.status(500).json(err);
                else
                    res.status(200).json(rez)
            });
        }
    }
};


const getUsers = (req, res) => {
    Uporabnik.find().exec(
        (error, users) => {
            if (!users) {
                return res.status(404).json({
                    "error": "users not found"
                });
            } else if (error) {
                return res.status(500).json(error);
            } else {
                res.status(200).json(users);
            }
        }
    );
};

const updateUser = (req, res) => {

    var id = req.body._id;
    var ObjectId = (mongoose.Types.ObjectId);

    console.log("User:" + id);


    Uporabnik.updateOne({"_id": ObjectId(id)}, {$set:
            {
                "name": req.body.name,
                "surname": req.body.surname,
                "email": req.body.email,
                "admin": req.body.admin
            }
    }, function (error, result) {
        if (error){
            console.log(error)
            ;
            return res.status(500).json(error);
        }
        else {

            return res.status(200).json(result);
        }
    });
};

const deleteUser = (req, res) => {
    var id = req.params.userId;
    var ObjectId = (mongoose.Types.ObjectId);

    Uporabnik.deleteOne({"_id": ObjectId(id)},
        function (error, result) {
            if (error) res.status(404).json(result);
            else res.status(200).json(result);
        })

};

module.exports = {
    vrniUporabnika,
    narediUporabnika,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
};