var axios = require("axios");
var apiKey = "73886b6dc2e64ceda94844e8a02e5c06";

var helper = {
    getArticles: function (state) {
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + state.topic + "&?begin_date=" + state.startYear + "&?end_date=" + state.endYear;
        return axios.get(queryURL).then(function (body) {
            console.log(body.data.response.docs);
            if (body.data.response.docs) {
                return body.data.response.docs;
            }
        }).catch(function (e) {
            console.log(e);
            // If we don't get any results, return an empty string
            return "";
        });
    },

    //write a saveArticles function to save the article title and link on click of the save button
    saveArticle: function (postData) {
        return (axios.post("/articles", postData).then(function (res) {
            console.log(res);
        }).catch(function (e) {
            console.log(e);
        }));
    }
}

module.exports = helper;