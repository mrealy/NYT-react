var React = require("react");

var Link = require("react-router").Link;

var helper = require("../utils/helper");
var Results = require("./Results");

var Search = React.createClass({
    getInitialState: function() {
        return {
            results: {},
            topic: "",
            startYear: "",
            endYear: ""
        };
    },
    handleChange: function (event) {
        console.log("TEXT CHANGED");
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var state = this.state;
        console.log("CLICKED");
        helper.getArticles(state).then(function (articles) {
            this.setState({ results: articles });
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h2>Search for an article</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-12">
                                <label htmlFor="topic">Topic:</label>
                                <input type="text" className="form-control" id="topic" 
                                value={this.state.topic} onChange={this.handleChange}
                                placeholder="Type an article topic here to search for" />
                            </div>
                            
                            <div className="form-group col-md-12">
                                <label> Date Range: </label>
                                <input type="date" className="form-control col-md-6" id="startYear"
                                value={this.state.startYear} onChange={this.handleChange}
                                placeholder="Start Date" />

                                <span className="input-group-addon" />

                                <input type="date" className="form-control col-md-6" id="endYear"
                                value={this.state.endYear} onChange={this.handleChange}
                                placeholder="End Date" />
                            </div>
                            <br/>
                            <button className="btn btn-default" onClick={this.handleSubmit}>Search</button>
                        </form>
                    </div>
                </div>
                <Results articles={this.state.results} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = Search;