var React = require('react');
var Link = require('react-router').Link;

var Join = React.createClass({
  join(){
    var memberName = this.refs.name.value;
    this.props.emit('join',  {name: memberName});
    // console.log("TODO: Join member %s", memberName);
  },

  render(){
      return(
        <form action="javascript:void(0)" onSubmit={this.join}>
          <label>Full Name</label>
          <input ref="name" className="form-control" placeholder="Enter your full name" required/>
          <button className="btn btn-primary">Join</button>
          <Link to="/speaker">Join as speaker</Link>
        </form>
      );
  }
});

module.exports = Join;
