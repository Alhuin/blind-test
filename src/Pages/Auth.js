import React, { Component } from 'react';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedMusics: [],
      userName: '',
    }
  }

  addUserName = (e) => {
    this.setState({ userName: e.target.value})
  };

  addArtist = (e) => {
    const { addedMusics } = this.state;
    const musicId = e.target.className;
    let edition = false;

    addedMusics.forEach((music) => {
      if (musicId === music.id) {
        music.artist = e.target.value.toLowerCase();
        edition = true;
      }
    });

    if (!edition) {
      addedMusics.push({id: musicId, artist: e.target.value.toLowerCase().replace(' ', ''), title: '', link: ''})
    }
    this.setState({ addedMusics });
  };

  addTitle = (e) => {
    const { addedMusics } = this.state;
    const musicId = e.target.className;
    let edition = false;

    addedMusics.forEach((music) => {
      if (musicId === music.id) {
        music.title = e.target.value.toLowerCase();
        edition = true;
      }
    });

    if (!edition) {
      addedMusics.push({id: musicId, artist: '', title: e.target.value.toLowerCase().replace(' ', ''), link: ''})
    }
    this.setState({ addedMusics });
  };

  addLink = (e) => {
    const { addedMusics } = this.state;
    const musicId = e.target.className;
    let edition = false;

    addedMusics.forEach((music) => {
      if (musicId === music.id) {
        music.link = e.target.value;
        edition = true;
      }
    });

    if (!edition) {
      addedMusics.push({id: musicId, artist: '', title: '', link: e.target.value})
    }
    this.setState({ addedMusics });
  };

  handleClick = () => {
    if (this.state.userName.replace(/\s/g, '') === '') {
      alert('Rentre un nom !');
    } else if (this.state.addedMusics.length !== 5) {
      alert('Rentre 5 musiques !')
    } else {
      this.props.socket.emit('enter', this.state.userName, this.state.addedMusics);
      this.props.history.push({
        pathname: "/loading",
      });
    }
  };

  render() {
    return (
      <div id={"main"}>
        <h2>Ton Nom</h2>
        <input id={'loginput'} type={"text"} placeholder={"Nom"} onChange={this.addUserName}/>
        <h2>Tes musiques</h2>
        <table>
            <thead>
            <tr>
              <th>Artiste</th>
              <th>Titre</th>
              <th>Lien Youtube</th>
            </tr>
            </thead>
            <tbody>
              <tr key={1}>
                <td><input className={1 + ' input'} onChange={this.addArtist}/></td>
                <td><input className={1 + ' input'} onChange={this.addTitle}/></td>
                <td><input className={1 + ' input'} onChange={this.addLink}/></td>
              </tr>
              <tr key={2}>
                <td><input className={2 + ' input'} onChange={this.addArtist}/></td>
                <td><input className={2 + ' input'} onChange={this.addTitle}/></td>
                <td><input className={2 + ' input'} onChange={this.addLink}/></td>
              </tr>
              <tr key={3}>
                <td><input className={3 + ' input'} onChange={this.addArtist}/></td>
                <td><input className={3 + ' input'} onChange={this.addTitle}/></td>
                <td><input className={3 + ' input'} onChange={this.addLink}/></td>
              </tr>
              <tr key={4}>
                <td><input className={4 + ' input'} onChange={this.addArtist}/></td>
                <td><input className={4 + ' input'} onChange={this.addTitle}/></td>
                <td><input className={4 + ' input'} onChange={this.addLink}/></td>
              </tr>
              <tr key={5}>
                <td><input className={5 + ' input'} onChange={this.addArtist}/></td>
                <td><input className={5 + ' input'} onChange={this.addTitle}/></td>
                <td><input className={5 + ' input'} onChange={this.addLink}/></td>
              </tr>
            </tbody>
          </table>
          <button
            className={"button"}
            onClick={() => this.handleClick()}
          >
            <span>Entrer</span>
          </button>
      </div>
    )
  }
}

export default Auth;