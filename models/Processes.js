const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    subprocesses: [
        {
            title:  {
                type:  String,
                required: true
            },
            completed: {
                type: Boolean,
                // required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Process = mongoose.model('process', ProcessSchema);