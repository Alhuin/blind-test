import React, { Component } from 'react';
import MediaPlayer from '../Components/Player';
import Controls from '../Components/Controls';
import { Link } from 'react-router-dom';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLaunched: false,
      musics: [],
      answers: [],
      endReached : false,
      admin: this.props.location.state.admin,
      score: 0,
      corrected: false,
    };

  }

  componentDidMount() {
    this.props.socket.on('correction', (correct) => {
      this.setState({ score: correct.length});
      correct.forEach((correct) => document.getElementById(correct).style.color = 'green')
    });

    this.props.socket.on('sendMusics', (musics) => {
      this.setState({ musics });
      console.log(this.state.musics);
    });

    this.props.socket.on('launch', () => {
      this.setState({playerLaunched: true});
      document.getElementById('launch').style.display = 'none';
      this.props.socket.emit('getNextUrl');
    });

    this.props.socket.on('endPlaylist', () => {
      this.setState({endReached: true});
    });
    this.props.socket.emit('getMusics');
  }

  addArtist = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');
    let edition = false;

    answers.forEach((answerRow) => {
      if (answerId === answerRow.id) {
        answerRow.artist = e.target.value.toLowerCase().replace(' ', '');
        edition = true;
      }
    });

    if (!edition) {
      answers.push({id: answerId, artist: e.target.value.toLowerCase().replace(' ', ''), title: ''})
    }
    this.setState({ answers });
  };

  addTitle = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');
    let edition = false;

    answers.forEach((answerRow) => {
      if (answerId === answerRow.id) {
        answerRow.title = e.target.value.toLowerCase();
        edition = true;
      }
    });

    if (!edition) {
      answers.push({id: answerId, artist: '', title: e.target.value.toLowerCase().replace(' ', '')})
    }
    this.setState({ answers });
  };

  renderTableData() {
    return this.state.musics.map((song, index) => {
      const { id } = song;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td><input id={`${id}.0`} className={id + ' input'} onChange={this.addArtist}/></td>
          <td><input id={`${id}.1`} className={id + ' input'} onChange={this.addTitle}/></td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div id={"main"}>
        <h2>Blind Test</h2>
        <Controls
          admin={this.state.admin}
          launch={() => {
            document.getElementById('launch').style.display = 'none';
            this.props.socket.emit('launchedPlaylist');
          }}
          // next={() => alert('next')}
        />
        { this.state.playerLaunched && (<MediaPlayer admin={this.state.admin} socket={this.props.socket}/>)}
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Artiste</th>
            <th>Titre</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTableData()}
          </tbody>
        </table>
        <div id={"score"} style={{display: 'none', fontSize: '20px'}}>Ton score: {this.state.score}</div>
        { this.state.corrected ?
          (
            <li>
              <Link to={"/results"}>
                <button
                id={'submit'}
                className={"button"}
                type={"submit"}
                >
                  <span>Résultats </span>
                </button>
              </Link>
            </li>
          )
          : (
            <button
              id={'submit'}
              className={"button"}
              type={"submit"}
              onClick={() => {
                this.props.socket.emit('submit', 'ju', this.state.answers);
                this.setState({ corrected: true});
                document.getElementById("score").style.display = 'block';
              }}
              disabled={!this.state.endReached}
            >
              <span>Corriger </span>
            </button>
          )}

      </div>
    )
  }
}

export default Play;