import React, { Component } from 'react';
import CustomTable from "../Components/CustomTable";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedMusics: [],
      userName: '',
    }
  }

  updateUserName = (e) => {
    this.setState({ userName: e.target.value})
  };

  updateArtist = (e) => {
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

  updateTitle = (e) => {
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

  updateLink = (e) => {
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
    let error = false;

    const { userName, addedMusics } = this.state;

    if (userName.replace(/\s/g, '') === '') {
      alert('Rentre un nom !');
    } else if (addedMusics.length !== process.env.REACT_APP_NB_MUSICS) {
      alert('Rentre ' + process.env.REACT_APP_NB_MUSICS + ' musiques !')
    } else {
      addedMusics.forEach((music) => {
        if (music.link.replace(/\s/g, '') === '') {
          alert('Rentre les liens');
          error = true;
        }
      });

      if (!error) {
        this.props.setUser({userName: userName, addedMusics: addedMusics});
        this.props.history.push({
          pathname: "/loading",
        });
      }
    }
  };

  render() {
    return (
      <div id={"main"}>
        <h2>Ton Nom</h2>
          <input id={'loginput'} type={"text"} placeholder={"Nom"} onChange={this.updateUserName}/>
        <h2>Tes musiques</h2>
          <CustomTable
            type={"Auth"}
            updateArtist={this.updateArtist}
            updateTitle={this.updateTitle}
            updateLink={this.updateLink}
          />
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