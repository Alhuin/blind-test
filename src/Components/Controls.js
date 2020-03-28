import React, { Component } from 'react'

class Controls extends Component {
  render() {
    const { launch, next } = this.props;
    return (
      <div>
        <img id={'launch'} src={require('../assets/icons/play.png')} onClick={launch} alt={'play'} className={'control'} style={{display: (this.props.admin) ? 'block' : 'none'}}/>
        {/*<img src={require('../assets/icons/next.png')} onClick={next} alt={'next'} className={'control'}/>*/}
      </div>
    )
  }
}

export default Controls;