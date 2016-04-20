var React = require('react');

var Board = React.createClass({
    render() {
        return (
          <div>
            <h1>THOUGHTS ON TODAYS QUESTION: YOU CAN POST EVERY 30 minutes. Think about what you say you only can write 300 charcters.</h1>
            <p>IF YOUR COMMENT IS VOTED DOWN -5 times in a row your comment will be pushed into the bottom box. if it goes below -14 it will be erased. if your comment goes +5 in a row it will go into the top. If your comments are in the top 5 in the end you will be contacted to add your topic into the box of topics has the most upvotes</p>
            <i>The goal here is to provoke thought on iconiclastic topics. Theyre never specific but peoples opinions may be offensive. The things you say <b>CAN NOT </b> be edited or deleted.</i>
          </div>
        );
    }
});

module.exports = Board;
