var React = require("react");

var Link = require("react-router").Link;

var Main = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>New York Times - React</h1>
                    <Link to="/search"><button className="btn btn-default">Search</button></Link>
                    <Link to="/saved"><button className="btn btn-default">Saved</button></Link>
                </div>
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Main;