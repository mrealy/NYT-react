var React = require("react");

var router = require("react-router");

var Route = router.Route;
var Router = router.Router;

var hashHistory = router.hashHistory;

var IndexRoute = router.IndexRoute;

var Main = require("../components/Main");
var Search = require("../components/children/Search");
var Results = require("../components/children/Results");
var Saved = require("../components/children/Saved");

module.exports = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <Route path="Search" component={Search} />
            <Route path="Saved" component={Saved} />

            <IndexRoute component={Search} />
        </Route>
    </Router>
);