var React = require('react');
// var ReactDOM = require('react-dom');
var io = require('socket.io-client');
var Header = require('./parts/Header.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
//App
var APP = React.createClass({
  
    getInitialState() {
        return {
            status: 'disconnected',
            title: '',
            question: 'What\'s the meaning of life?',
            emit: this.emit,
            member: {},
            audience: [],
            speaker: ''
        }
    },

    componentWillMount() {
        this.socket = io('https://writteninstone.herokuapp.com/#/');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.updateState);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
        this.socket.on('start', this.start);
        this.socket.on('end', this.updateState);
    },

    emit(eventName, payload){
      this.socket.emit(eventName, payload);
    },

    connect(socket) {

        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

        console.log(member);
        if(member && member.type === 'member'){
          this.emit('join', member);
          console.log(member);
        } else if (member && member.type === 'speaker') {
          this.emit('start', {name: member.name, title: sessionStorage.title, started: 1});
        }

        // sessionStorage.member = JSON.stringify(member);

        this.setState({
            status: 'connected'
        });
        console.log('Connection id: %s', this.socket.id);
    },

    disconnect() {
        this.setState({
            status: 'disconnected',
            title: 'disconnected',
            speaker: ''
        });
    },

    updateState(serverState){
      console.dir(serverState);
      console.log('updating state ^');
      this.setState(serverState);
    },

    joined(member){
      sessionStorage.member = JSON.stringify(member);
      this.setState({member: member});
    },

    updateAudience(newAudience){
      this.setState({audience: newAudience})
    },

    start(presentation){
      console.log('Its starting');
      console.log(presentation);
      if(this.state.member.type === 'speaker'){
        sessionStorage.title = presentation.title;
      }
      this.setState(presentation);
    },

    render() {
        return (
          <div>
            <div>
              <Header {...this.state}/>
            </div>
            {/*github.com/reactjs/react-router-tutorial/tree/master/lessons/04-nested-routes*/}
            {this.props.children, React.cloneElement(this.props.children, this.state)}
          </div>
        );
    }
});

module.exports = APP;
