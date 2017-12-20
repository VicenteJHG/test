const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let joggingTimeSchema = new Schema({
    date: Date,
    time: Number,
    distance: Number,
    average: Number,
    userId: {
        type: ObjectId,
        required: true
    },
    
});

joggingTimeSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports.JoggingTimeModel = mongoose.model('Time', joggingTimeSchema);
