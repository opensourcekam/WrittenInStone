var React = require('react');

var JoinSpeaker = React.createClass({
  start(){
    var speakerName = this.refs.name.value;
    var title = this.refs.title.value;
    this.props.emit('start',  {name: speakerName, title: title});
    // alert(`TODO: start ${title} by ${speakerName}`);
  },

  render(){
      return(
        <form action="javascript:void(0)" onSubmit={this.start}>
          <label>Full Name</label>
          <input ref="name" className="form-control" placeholder="Enter your full name" required/>

          <label>Presentation Title</label>
          <input ref="title" className="form-control" placeholder="Enter your title for the presentation" required/>
          <button className="btn btn-primary">Start</button>
        </form>
      );
  }
});

module.exports = JoinSpeaker;
