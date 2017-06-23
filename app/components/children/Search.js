var React = require("react");

var Link = require("react-router").Link;

var helper = require("./utils/helper");
var Results = require("./Results");

var Search = React.createClass({
    getInitialState: function() {
        return {
            topic: "",
            startYear: "",
            endYear: "",
            articles: []
        };
    },
    handleChange: function (event) {
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
    },
    handleSubmit: function (event) {
        event.preventDefault();
        var state = this.state;
        // this.setState(this.getInitialState());
        helper.getArticles(state).then(function (articles) {
            this.setState({ articles: articles });
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <h2>Search for an article</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="topic">Topic:</label>
                                <input type="text" className="form-control" id="topic" 
                                value={this.state.topic} onChange={this.handleChange}
                                placeholder="Type an article topic here to search for" />
                            </div>
                            <label> Date Range: </label>
                            <div className="input-group">
                                <input type="text" className="form-control" 
                                value={this.state.startYear} onChange={this.handleChange}
                                placeholder="Start Date" />

                                <span className="input-group-addon" />

                                <input type="text" className="form-control" 
                                value={this.state.endYear} onChange={this.handleChange}
                                placeholder="End Date" />
                            </div>
                            <br/>
                            <Link to="/results"><button className="btn btn-default" value="submit">Search</button></Link>
                            
                        </form>
                    </div>
                </div>
                <Results articles={this.state.articles} />
            </div>
        );
    }
});

module.exports = Search;