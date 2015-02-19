/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery'),
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    NotFoundRoute = Router.NotFoundRoute,
    Game = require('./games/solve.jsx');

var App = React.createClass({
    mixins: [Router.State],
    getHandlerKey: function () {
        var childDepth = 1; // assuming App is top-level route
        var key = this.getRoutes()[childDepth].name;
        if (this.getParams().id) key += id;
        return key;
    },
    render: function () {
        return (
            <div className="app">
                <header>
                    <h1>
                        <Link to="app">Суперсайт</Link>
                    </h1>
                </header>

                <RouteHandler/>

                <footer>
                    <p>
                        ©&nbsp;<a href="#copyright">tug</a>
                    </p>
                </footer>
            </div>
        );
    }
});

var DefaultComponent = React.createClass({
    render: function () {
        return (
            <div className="">
                123
            </div>
        )
    }
});

var Default = React.createClass({
    getInitialState: function() {
        return {
            component: DefaultComponent,
            componentState: {}
        }
    },
    componentWillMount: function() {
        $.get("http://localhost:8000/game/qqqq/", {}, function(response) {
            var currentRound = response.current_round;
            var componentName = currentRound.component;
            var componentState = currentRound.state;
            var component = Game[componentName];
            this.setState({component: component, componentState: componentState});
        }.bind(this), "json");
    },
    render: function () {
        var component = React.createFactory(this.state.component)(this.state.componentState);
        return (
            <div className="content">
                <h2 className="content__header">Ура!</h2>
                <div className="content__body">
                    {component}
                </div>
            </div>
        )
    }
});


var NotFound = React.createClass({
    render: function () {
        return (
            <div className="content error_status_404">
                <h2 className="content__header">Упс!</h2>
                <div className="content__body">
                    <p>У нас пока нет такой страницы.</p>
                </div>
            </div>
        )
    }
});


var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Default}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);


module.exports = function () {
    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.body);
    });
};