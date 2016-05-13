var React = require('react');

var Opinion = React.createClass({

  addMemberRow(member, i){
    return (
            <tr key={i}>
              <td><p>{member.chat}</p></td>
            </tr>
          );
  },

  render() {
    return (
            <div>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Ideas</th>
                </tr>
                </thead>
                <tbody>
                  {/*return some jsx for each member*/}
                  {this.props.opinions.map(this.addMemberRow)}
                </tbody>
              </table>
            </div>
          );
    }
});

module.exports = Opinion;
