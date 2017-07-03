var axios = require("axios");
var apiKey = "73886b6dc2e64ceda94844e8a02e5c06";

var helper = {
    getArticles: function (state) {
        var startQuery = state.startYear.trim() + "0101";
        var endQuery = state.endYear.trim() + "1231";
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + state.topic + "&?begin_date=" + startQuery + "&?end_date=" + endQuery;
        
        return axios.get(queryURL).then(function(results) {
            console.log("Axios results", results.data.response.docs);
            if (results.data.response) {
                return results.data.response.docs;
            }
        }).catch(function (e) {
            console.log(e);
            // If we don't get any results, return an empty string
            return "";
        });
    },

    //write a saveArticles function to save the article title and link on click of the save button
    saveArticle: function (title, date, url) {
        var savedArticle = { title: title, date: date, url: url };
        return (axios.post("/articles", savedArticle).then(function (res) {
            console.log("Axios post results", res.data._id);
            return res.data._id;
        }).catch(function (e) {
            console.log(e);
        }));
    }
}

module.exports = helper;