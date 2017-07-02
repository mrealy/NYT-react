var React = require("react");

var Link = require("react-router").Link;

var helper = require("../utils/helper");

var Results = React.createClass({
    // getInitialState would go here
    getInitialState: function() {
        return {
            title: "",
            url: "",
            pubdate: ""
        };
    },
    //handleClick for saving articles
    listArticles: function() {
        console.log(this.props);
        return this.props.articles.map(function(article, index) {
            
            return (
                <div key={index}>
                    <li className="list-group-item">
                        <h3>{article.headline.main}</h3>
                        <a href={article.web_url}>
                            <button className="btn btn-default">View</button>
                        </a>
                        <button className="btn btn-primary">Save</button>
                    </li>
                </div>
            );
        }.bind(this));
    },
    articleContainer: function() {
        console.log("article container", this.props.articles[0]);
        return (
            <div className="main-container">
                <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h1 className="panel-title">
                        <strong>
                            <i className="fa fa-list-alt"></i>
                            Results
                        </strong>
                        </h1>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {/*
                            {this.listArticles()}
                            */}
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );
    },

    render: function() {
        console.log("render", this.props.articles);
        if (!this.props.articles) {
            return (
                <li className="list-group-item">
                <h3>
                    <span>
                    <em>Enter search terms to begin...</em>
                    </span>
                </h3>
                </li>
            );
        }
        return this.articleContainer();
    }
});

module.exports = Results;