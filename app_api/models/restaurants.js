var mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * components:
 *  schemas:
 *   restaurants:
 *    type: object
 *    properties:
 *     name:
 *          type: string
 *     address:
 *          type: string
 *     rating:
 *          type: number
 *
 *     mealPrice:
 *          type: number
 *     student:
 *          type: number
 *     studentPrice:
 *          type: number
 *
 *
 *     description:
 *          type: string
 *     icon:
 *          type: string
 *     front:
 *          type: string
 *     timeTable:
 *          type: array
 *          items:
 *              type: string
 *     comments:
 *          $ref: '#/components/schemas/comments'
 */

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    rating: Number,
    mealPrice: Number,
    student: Boolean,
    studentPrice: Number,
    timeTable: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    description: String,
    comments:  { type: Schema.Types.ObjectId, ref: 'komentarji' },
    icon: String,
    front: String,

});

var restaurant = mongoose.model('restaurant', restaurantSchema, "Restaurant");