var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *  schemas:
 *   analyticsSchema:
 *    type: object
 *    properties:
 *
 *     name:
 *      type: string
 *     numOfVisits:
 *      type: number
 */

const analyticsSchema = new Schema ({
    name: String,
    numOfVisits: Number
});

var analytics = mongoose.model('analytics', analyticsSchema, "Analytics");