var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


/**
 * @swagger
 * components:
 *  schemas:
 *   uporabnikSchema:
 *    type: object
 *    properties:
 *     name:
 *          type: string
 *     surname:
 *          type: string
 *     email:
 *          type: string
 *
 *     admin:
 *          type: bool
 *     zgoscenaVrednost:
 *          type: string
 *     nakljucnaVrednost:
 *          type: string
 *
 */

const uporabnikiShema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    admin: Boolean,
    komentarjiUporabnika: [{ type: Schema.Types.ObjectId, ref: 'komentarji' }],
    zgoscenaVrednost: String,
    nakljucnaVrednost: String
});

uporabnikiShema.methods.nastaviGeslo = function(geslo) {
    var nakljucnaVrednost = crypto.randomBytes(16).toString('hex');
    var zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
    return [nakljucnaVrednost, zgoscenaVrednost];
};

uporabnikiShema.methods.preveriGeslo = function(geslo, nakljucnaVrednost) {
    var zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, nakljucnaVrednost, 1000, 64, 'sha512')
        .toString('hex');
    return this.zgoscenaVrednost === zgoscenaVrednost;
};

uporabnikiShema.methods.generirajJwt = function() {
    const datumPoteka = new Date();
    datumPoteka.setTime(datumPoteka.getTime() + (60*60*1000));

    return jwt.sign({
        _id: this._id,
        elektronskiNaslov: this.email,
        ime: this.name,
        priimek: this.surname,
        admin: this.admin,
        datumPoteka: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_GESLO);
};


var uporabniki = mongoose.model('uporabniki', uporabnikiShema, "Uporabnik");

