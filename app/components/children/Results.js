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
    handleClick: function(item) {
        helper.saveArticle(item.headline.main, item.pub_date, item.web_url).then(function() {
        });
    },
    listArticles: function() {
        return this.props.articles.map(function(article, index) {
            if (article.pub_date) {
                var articledate = article.pub_date.slice(5, 10) + "-" + article.pub_date.slice(0, 4);
            }    
            return (
                <div key={index}>
                    <li className="list-group-item">
                        <h3>{article.headline.main}</h3>
                        {article.pub_date ? (<p>Published: {articledate}</p>) : (null)}
                        <a href={article.web_url} target="_blank">
                            <button className="btn btn-default">View</button>
                        </a>
                        <button className="btn btn-primary" onClick={function () { this.handleClick(article) }.bind(this) }>Save</button>
                    </li>
                </div>
            );
        }.bind(this));
    },
    articleContainer: function() {
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
                            
                            {this.listArticles()}
                            
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );
    },

    render: function() {
        if (!this.props.articles.map) {
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