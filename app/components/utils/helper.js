var axios = require("axios");
var apiKey = "73886b6dc2e64ceda94844e8a02e5c06";

var helper = {
    getArticles: function (state) {
        // remove hyphens from the startYear and endYear inputs for API query format.
        var startQuery = state.startYear.replace(/-/g, "");
        var endQuery = state.endYear.replace(/-/g, "");
        // setting queryURL string including topic, start & end queries.
        if (startQuery !== "" && endQuery !== ""){
            var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + state.topic + "&begin_date=" + startQuery + "&end_date=" + endQuery;
            
        } else {
            var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + state.topic;
        }
        // console.log('queryURL: ', queryURL);
        return axios.get(queryURL).then(function(results) {
            console.log("Axios results", results.data.response.docs);
            if (results.data.response) {
                return results.data.response.docs;
            }
        }).catch(function (e) {
            console.log(e);
            alert("Oops, there are no articles with those parameters! Try a different topic.");            
            // If we don't get any results, return an empty string
            return "";
        });
    },

    //write a saveArticles function to save the article title and link on click of the save button
    saveArticle: function (title, date, url) {
        var savedArticle = { title: title, date: date, url: url };
        return axios.post("/articles", savedArticle).then(function (response) {
            console.log(response);
            return response.data._id;
        }).catch(function (e) {
            console.log(e);
        });
    },
    getSaved: function() {
        return axios.get("/articles").then(function(results) {
            return results;
        });
    },
    deleteSaved: function(title, data, url) {
        return axios.delete("/articles", {
            params: {
                "title": title,
                "data": data,
                "url": url
            }
        }).then(function(results) {
            return results;
        });
    }
};

module.exports = helper;