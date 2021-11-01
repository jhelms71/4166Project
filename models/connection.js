const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    topic: {type: String, required: [true, 'author is required']},
    details: {type: String, required: [true, 'content is required'], 
              minLength: [10, 'the content should have at least 10 characters']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'starttime is required']},
    endTime: {type: String, required: [true, 'endTime is required']},
    host: {type: String, required: [true, 'host is required']},
    imageURL: {type: String, required: [true, 'imageURL is required']},
    location: {type: String, required: [true, 'location is required']}
},
{timestamps: true}
);
//collection name is stories in the database
module.exports = mongoose.model('Connection', connectionSchema);