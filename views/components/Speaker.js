var React = require('react');
var Link = require('react-router').Link;
var Display = require('./parts/Display');
var JoinSpeaker = require('./parts/JoinSpeaker');
var Attendance = require('./parts/Attendance');

var Speaker = React.createClass({
    render() {
        return (
                <div>
                <Display if={this.props.status === 'connected'}>

                   {/*this display shows if you are the speaker */}

                    <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
                      <p>Questions</p>
                      <Attendance audience={this.props.audience}/>
                    </Display>

                    {/*this display show if the show hasnt started and youre not a member already*/}

                    <Display if={this.props.started === 0 && this.props.member.type != 'member'}>
                      <h2>Start the presentation</h2>
                      <p>started {this.props.started}</p>
                      <JoinSpeaker emit={this.props.emit}/>
                    </Display>

                    {/*this display show if the show has begun initilization and youre a member */}

                    <Display if={this.props.started === 1 && this.props.member.type === 'member'}>
                      <h3>Polling will start soon!</h3>
                    </Display>

                    {/*this display shows if the show has started but youre not yet signed in as a member */}

                    <Display if={this.props.started === 1 && !this.props.member.type}>
                      <h3>Join as a member to answer some questions!</h3>
                      <Link to="/">Join as member</Link>
                    </Display>

                </Display>
              </div>
              );
    }
});

module.exports = Speaker;
