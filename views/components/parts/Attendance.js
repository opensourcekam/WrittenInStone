var React = require('react');

var Attendance = React.createClass({

  addMemberRow(member, i){
    return (
            <tr key={i}>
              <td>{member.name}</td>
              <td>{member.id}</td>
            </tr>
          );
  },
  
  render() {
    return (
            <div>
              <h2>Attendance - {this.props.audience.length} members</h2>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Audience Member</th>
                  <th>Id</th>
                </tr>
                </thead>
                <tbody>
                  {/*return some jsx for each member*/}
                  {this.props.audience.map(this.addMemberRow)}
                </tbody>
              </table>
            </div>
          );
    }
});

module.exports = Attendance;
