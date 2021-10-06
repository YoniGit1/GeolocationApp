const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let DistancePair = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    hits: {
        type: Number,
        default: 0
    }
}, {
    collection: 'Distance'
})

module.exports = mongoose.model('DistancePair', DistancePair);