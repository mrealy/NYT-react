var React = require("react");

var helper = require("../utils/helper");

var Saved = React.createClass({
    getInitialState: function() {
        return { savedArticles: "" };
    },
    //componentDidMount
    componentDidMount: function() {
        helper.getSaved().then(function(articleData) {
            this.setState({ savedArticles: articleData.data });
            console.log("saved results", articleData);
        }.bind(this));
    },
    
    //handleClick for deleting articles
    handleClick: function(item) {
        console.log("CLICKED DELETE");
        console.log(item);
        helper.deleteSaved(item.title, item.date, item.url).then(function() {
            helper.getSaved().then(function(articleData) {
                this.setState({ savedArticles: articleData.data });
                console.log("saved results deleteClick", articleData.data);
            }.bind(this));
        }.bind(this));
    },
    renderArticles: function() {
        return this.state.savedArticles.map(function(article, index) {

            return (
                <div key={index}>
                <li className="list-group-item">
                    <h3>
                    <span>
                        <em>{article.title}</em>
                    </span>
                    <span className="btn-group pull-right">
                        <a href={article.url} rel="noopener noreferrer" target="_blank">
                        <button className="btn btn-default ">View Article</button>
                        </a>
                        <button className="btn btn-primary" onClick={function () { this.handleClick(article) }.bind(this)}>Delete</button>
                    </span>
                    </h3>
                    <p>Date Published: {article.date}</p>
                </li>
                </div>
            );
        }.bind(this));
    },
    renderContainer: function() {

        return (
        <div className="main-container">
            <div className="row">
            <div className="col-lg-12">
                <div className="panel panel-primary">
                <div className="panel-heading">
                    <h1 className="panel-title">
                    <strong>
                        <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                    </h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                    {this.renderArticles()}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        );
    },
    render: function() {
        if (!this.state.savedArticles.map) {
            return (
                <li className="list-group-item">
                    <h3>
                    <span>
                        <em>Save your first article...</em>
                    </span>
                    </h3>
                </li>
            );
        }
        return this.renderContainer();
    }
});

module.exports = Saved;