// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class
var Schema = mongoose.Schema;

// Create article schema
var Article = new Schema({
    // required title
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // required link
    url: {
        type: String,
        required: true
    }
});

// create article model with article schema
var Article = mongoose.model("Article", Article);

// export the model
module.exports = Article;