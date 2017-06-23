var React = require("react");

var Link = require("react-router").Link;

var Results = React.createClass({
    // getInitialState would go here
    render: function() {
        return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p> results would go here </p>
                        <div id="results"> </div>
                    </div>
                </div>
        );
    }
});

module.exports = Results;