var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost/NYTarticles");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection was successful");
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/saved", function(req, res) {
    Articles.find({}).then(function(Articles) {
        res.render();
    });
});

app.post("/api/saved", function(req, res) {

});

app.delete("/api/saved", function(req, res) {

});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});