import React, { Component } from 'react';
import ReactPlayer from "react-player";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      admin: this.props,
    };
  }

  componentDidMount() {
    this.props.socket.on('nextUrl', (url) => {
      console.log('nexturl front');
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
    return <ReactPlayer
      id={'player'}
      url={this.state.url}
      playing
      onPlay={() => {
          setTimeout(() => {
            this.props.socket.emit('getNextUrl')
          }, 30000)
        }
      }
    />
  }
}

export default Player;