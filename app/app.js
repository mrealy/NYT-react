var React = require("react");
var ReactDOM = require("react-dom");

// require components or routes
var routes = require("./config/routes");

// renders contents from routes
ReactDOM.render(routes, document.getElementById("app"));