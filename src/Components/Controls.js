import React, { Component } from 'react'

class Controls extends Component {
  render() {
    const { launch } = this.props;
    return (
      <div>
        <img id={'launch'} src={require('../assets/icons/play.png')} onClick={launch} alt={'play'} className={'control'} style={{display: (this.props.admin) ? 'block' : 'none'}}/>
      </div>
    )
  }
}

export default Controls;