/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    $ = require('jquery');


var CollectPlayersRound = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <div className="">
                Collect
            </div>
        )
    }
});

module.exports = {
    CollectPlayersRound: CollectPlayersRound
};