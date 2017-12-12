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
                        <h2 className="col-md-12">Search for an article</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-12">
                                <label htmlFor="topic">Topic:</label>
                                <input type="text" className="form-control" id="topic" 
                                value={this.state.topic} onChange={this.handleChange}
                                placeholder="Type an article topic here to search for" />
                            </div>
                            
                            <div className="form-group col-md-12">
                                <input type="checkbox" id="toggle" />
                                <label htmlFor="toggle">
                                    <span className="expand">
                                        Search by Date Range
                                        <span className="glyphicon glyphicon-expand" />
                                        <span className="glyphicon glyphicon-collapse-down" />
                                    </span>
                                </label>
                                <div id="date-ranges" className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="startYear"> Start Date Range: </label>
                                        <input type="date" className="form-control" id="startYear"
                                        value={this.state.startYear} onChange={this.handleChange}
                                        placeholder="Start Date" />
                                    </div>

                                    {/*<span className="input-group-addon" />*/}
                                    <div className="col-md-6">
                                        <label htmlFor="endYear"> End Date Range: </label>
                                        <input type="date" className="form-control col-md-6" id="endYear"
                                        value={this.state.endYear} onChange={this.handleChange}
                                        placeholder="End Date" />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <button id="search-button" className="btn btn-default" onClick={this.handleSubmit}>Search</button>
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