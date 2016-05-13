var React = require('react');
var Display = require('./parts/Display');
var Opinion = require('./parts/Opinion');

var Board = React.createClass({
  getInitialState: function() {
   return {text: ''};
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  chat(){
    var opinion = this.refs.opinion.value;
    // console.log(opinion);
    this.props.emit('chat',  {chat: opinion});

    var nextText = '';
    this.setState({text: nextText});
    },

    render() {
        return (
          <div>
            {/*<h1>THOUGHTS ON TODAYS QUESTION: YOU CAN POST EVERY 30 minutes. Think about what you say you only can write 300 charcters.</h1>
            <p>IF YOUR COMMENT IS VOTED DOWN -5 times in a row your comment will be pushed into the bottom box. if it goes below -14 it will be erased. if your comment goes +5 in a row it will go into the top. If your comments are in the top 5 in the end you will be contacted to add your topic into the box of topics has the most upvotes</p>
            <i>The goal here is to provoke thought on iconiclastic topics. Theyre never specific but peoples opinions may be offensive. The things you say <b>CAN NOT </b> be edited or deleted.</i>*/}
            <Display if={this.props.member.name === undefined}>
              <Opinion opinions={this.props.opinions}/>
            </Display>

            <Display if={this.props.member.name}>
              <form action="javascript:void(0)" onSubmit={this.chat}>
                <textarea ref="opinion" className="opinion" placeholder="Give me your opinion but remembr whate you say is written in stone"  rows="5" required maxLength="320" onChange={this.onChange} value={this.state.text}></textarea>
                <button className="btn btn-danger">Carve</button>
              </form>
              <Opinion opinions={this.props.opinions}/>
            </Display>
          </div>
        );
    }
});

module.exports = Board;
