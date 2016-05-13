var React = require('react');
//Header
var Header = React.createClass({

    // getInitialState: function() {
    //   return {timeLeft: this.state.timeLeft};
    // },
    //
    // componentDidMount: function() {
    //   this.interval = setInterval(this.tick, 1000);
    // },
    //
    // componentWillUnmount: function() {
    //   clearInterval(this.interval);
    // },
    //
    // tick: function() {
    //   this.setState({timeLeft: this.state.timeLeft});
    // },

    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    getDefaultProps() {
      return {
        status: 'disconnected'
      }
    },

    render() {
        return ( <header className="row">
                    <div className="col-xs-10">
                      <h1>{this.props.title}</h1>
                      <h3><strong>{(((this.props.timeLeft / (1000*60*60)) % 24)).toFixed(0) }:{ (((this.props.timeLeft / (1000*60)) % 60)).toFixed(0) }:{ (((this.props.timeLeft / (1000)) % 60)).toFixed(0)}</strong>
                       </h3>
                      {/*<p>{this.props.speaker}</p>*/}
                      <nav >
                        <ul className="nav nav-pills">
                          <li>
                            <a href="/#/">Audience</a>
                          </li>
                          <li>
                            <a href="/#/Board">Board</a>
                          </li>
                          <li>
                            <a href="/#/Speaker">Speaker</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="col-xs-2">
                      <svg viewBox="0 0 120 120" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                      <circle id="connection-status" className={this.props.status} cx="60" cy="60" r="20"/>
                        </svg>
                    </div>
                </header>
              );
    }
});


module.exports = Header;
