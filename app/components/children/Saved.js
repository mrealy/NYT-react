var React = require("react");

var Saved = React.createClass({
    //componentDidMount
    //handleClick for deleting articles
    render: function() {
        return (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h2>Saved Articles</h2>
                    </div>
                </div>
        );
    }
});

module.exports = Saved;