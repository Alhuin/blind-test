import React, { Component } from 'react'
import { Media, Player } from 'react-media-player'

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      admin: this.props,
    };
  }

  componentDidMount() {
    this.props.socket.on('nextUrl', (url) => {
      this.setState({url})
    });
  }

  render() {
    return (
      <Media>
        <div className="media" id={"player"}>
          <div className="media-player">
            <Player
              onTimeUpdate={(e) => {
                if (e.currentTime > 30) {
                  this.setState({url: ''});
                  setTimeout(() => {
                    this.props.socket.emit('getNextUrl');
                  }, 5000)
                }
              }}
              autoPlay
              src={this.state.url}
            />
          </div>
        </div>
      </Media>
    )
  }
}

export default MediaPlayer;