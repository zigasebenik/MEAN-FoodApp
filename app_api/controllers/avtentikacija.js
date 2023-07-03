const passport = require('passport');
const mongoose = require('mongoose');
const Uporabnik = mongoose.model('uporabniki');

const registracija = (req, res) => {

    console.log(req.body);

    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.passwd1) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    const uporabnik = new Uporabnik();
    uporabnik.name = req.body.name;
    uporabnik.surname = req.body.surname;
    uporabnik.email = req.body.email;

    uporabnik.admin = false;

    Uporabnik.findOne({email: req.body.email}, function (error, user) {
        if (!user) {
            console.log("email ne obstaja OK to register")
            var vrednosti = uporabnik.nastaviGeslo(req.body.passwd1);
            uporabnik.nakljucnaVrednost = vrednosti[0];
            uporabnik.zgoscenaVrednost = vrednosti[1];
            uporabnik.save(napaka => {
                if (napaka) {
                    console.log(napaka)
                    res.status(500).json(napaka);
                } else {
                    res.status(200).json({"žeton": uporabnik.generirajJwt()})
                }
            });
        }
        else if (error)
        {
            res.status(500).json(error);
        }
        else {
             console.log("email obstaja");
             res.status(409).json({"sporočilo": "Uporabnik s tem naslovom že obstaja"});
         }
    });
};

const registerForDB = (req, res) => {
    console.log(req.body);

    if (!req.body.name || !req.body.surname || !req.body.email || !req.body.passwd1) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    const uporabnik = new Uporabnik();
    uporabnik.name = req.body.name;
    uporabnik.surname = req.body.surname;
    uporabnik.email = req.body.email;
    uporabnik.admin = req.body.admin;
    var vrednosti = uporabnik.nastaviGeslo(req.body.passwd1);
    uporabnik.nakljucnaVrednost = vrednosti[0];
    uporabnik.zgoscenaVrednost = vrednosti[1];
    uporabnik.save(napaka => {
        if (napaka) {
            res.status(500).json(napaka);
        } else {
            res.status(200).json({"žeton": uporabnik.generirajJwt()})
        }
    });
}

const prijava = (req, res) => {
    if (!req.body.email || !req.body.passwd) {
        return res.status(400).json({"sporočilo": "Zahtevani so vsi podatki"});
    }
    passport.authenticate('local', (napaka, uporabnik, informacije) => {
        if (napaka)
            return res.status(500).json(napaka);
        if (uporabnik) {
            var pagetoken = uporabnik.generirajJwt();
            return res.status(200).json({"pagetoken": pagetoken});
        } else {
            return res.status(401).json(informacije);
        }
    })(req, res);
};

module.exports = {
    registracija,
    prijava,
    registerForDB
};