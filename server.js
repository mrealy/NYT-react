var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.Promise = Promise;

var Article = require("./models/Article");

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
app.get("/articles", function(req, res) {
    Article.find({}).then(function(articles) {
        console.log("get route BUAHA");
        res.send(articles);
    }).catch(function(e) {
        console.log(e);
    });
});

app.post("/articles", function(req, res) {
    var newArticle = new Article(req.body);
    
    newArticle.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

app.delete("/articles", function(req, res) {
    var url = req.param("url");

    Article.find({ url: url }).remove().exec(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Deleted");
        }
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});