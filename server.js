var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.Promise = Promise;

//import Article model
var Article = require("./models/Article");

var app = express();
var PORT = process.env.PORT || 3000;

// bodyParser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set static 'public' folder
app.use(express.static("./public"));

//Mongo DB settings =====================================
mongoose.connect("mongodb://localhost/NYTarticles");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection was successful");
});
// ======================================================

// GET, POST, and DELETE routes =========================
app.get("/articles", function(req, res) {
    Article.find({}).then(function(articles) {
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

// React routes
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
// ===========================================================

// Listener ==================================================
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});