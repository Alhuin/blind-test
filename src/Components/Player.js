import React, { Component } from 'react'
import { Media, Player } from 'react-media-player'

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      index: 0,
    };
  }

  componentDidMount() {
    const { socket } = this.props;

    if (socket !== null) {
      socket.on('nextUrl', (id, url) => {
        this.setState({url})
      });
    }
  }

  render() {
    return (
      <Media>
        <div className="media" id={"player"}>
          <div className="media-player">
            <Player
              onTimeUpdate={(e) => {
                if (e.currentTime > 30) {
                  this.setState({url: '', index: this.state.index + 1});
                  setTimeout(() => {
                    this.props.socket.emit('getNextUrl', this.state.index);
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