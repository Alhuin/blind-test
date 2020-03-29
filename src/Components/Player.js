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
      if (this.state.url === '') {
        this.setState({url})
      } else {
        this.setState({url: ''});
        setTimeout(() => {
          this.setState({url})
        }, 10000)
      }
    });

    this.props.socket.on('endPlaylist', () => {
      this.setState({ url: '' })
    });

  }

  render() {
    return (
      <Media>
        <div className="media" id={"player"}>
          <div className="media-player">
            <Player
              autoPlay
              src={this.state.url}
              onPlay={ () => {
                setTimeout(() => {
                  this.props.socket.emit('getNextUrl')
                }, 30000)
              }}
            />
          </div>
        </div>
      </Media>
    )
  }
}

export default MediaPlayer;