var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const m2s = require('mongoose-to-swagger');

/**
 * @swagger
*  components:
*   schemas:
*       comments:
*           type: object
*           properties:
*
*               comment:
*                   type: string
*               rating:
*                   type: number
*               date:
*                   type: date
*               restaurant:
*                   $ref: '#/components/schemas/restaurants'
*               author:
*                   $ref: '#/components/schemas/uporabnikSchema'
 */

const commentSchema = new Schema ({
    restaurant: {type: Schema.Types.ObjectId, ref: 'restaurant'},
    author: {type: Schema.Types.ObjectId, ref: 'uporabniki'},
    comment: String,
    rating: Number,
    date: Date
});

var comment = mongoose.model('comments', commentSchema, "Comments");


/**
 * @swagger
 *  components:
 *   examples:
 *    NeNajdemLokacije:
 *     summary: ne najdem lokacije
 *     value:
 *      sporočilo: Ne najdem lokacije.
 *    NeNajdemKomentarja:
 *     summary: ne najdem komentarja
 *     value:
 *      sporočilo: Ne najdem komentarja.
 *    NiNobenegaKomentarja:
 *     summary: ni nobenega komentarja
 *     value:
 *      sporočilo: Ni nobenega komentarja.
 *    NiZetona:
 *     summary: ni JWT žetona
 *     value:
 *      sporočilo: "UnauthorizedError: No authorization token was found."
 */