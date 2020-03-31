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
      playing: 0,
      userName: this.props.location.state.userName,
    };

  }

  componentDidMount() {
    this.props.socket.on('correction', (correct) => {
      this.setState({ score: correct.length});
      correct.forEach((correct) => document.getElementById(correct).style.color = 'green')
    });

    this.props.socket.on('sendMusics', (musics) => {
      const answers = [];
      musics.forEach((music) => {
        answers.push({id: music.id, artist:'', title:''})
      });
      this.setState({ musics, answers });
    });

    this.props.socket.on('launch', () => {
      this.props.socket.emit('getNextUrl');
    });

    this.props.socket.on('endPlaylist', () => {
      this.setState({endReached: true});
    });

    this.props.socket.on('nextUrl', (id, url) => {
      this.setState({playing: id})
    });

    this.props.socket.emit('getMusics');
  }

  strcmp = (str1, str2) => {
    const s1 = str1.replace(/\s/g, '').toLowerCase();
    const s2 = str2.replace(/\s/g, '').toLowerCase();

    let diff = 0;

    console.log('user answered = ' + s1);
    console.log('correction = ' + s2);

    s2.split('').forEach(function(val, i){
      if (val !== s1.charAt(i))
        diff += 1;
    });

    console.log(`diff = ${diff}`);
    return diff;
  };

  addArtist = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');

    answers.forEach((answerRow) => {
      if (answerId.toString() === answerRow.id.toString()) {
        answerRow.artist = e.target.value;
      }
    });

    this.setState({ answers });
  };

  addTitle = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');

    answers.forEach((answerRow) => {
      if (answerId.toString() === answerRow.id.toString()) {
        answerRow.title = e.target.value;
      }
    });

    this.setState({ answers });
  };

  renderTableData() {
    return this.state.musics.map((song, index) => {
      const { id } = song;

      return (
        <tr key={id}  className={!this.state.endReached && this.state.playing === id ? "playing" : ""}>
          <td> {id}</td>
          <td><input id={`${id}.0`} className={id + ' input'} onChange={this.addArtist}/></td>
          <td><input id={`${id}.1`} className={id + ' input'} onChange={this.addTitle}/></td>
        </tr>
      )
    })
  }

  sendCorrection() {
    if (this.state.endReached) {
      const correction = { lines: [], points: 0 };

      this.state.musics.forEach((music, index) => {
        const artistIsCorrect = this.strcmp(this.state.answers[index].artist, music.artist) < (music.artist.length > 4 ? 3 : 1);
        const titleIsCorrect = this.strcmp(this.state.answers[index].title, music.title) < (music.title.length > 4 ? 3 : 1);
        const line = {
          id: index + 1,
          artist: this.state.answers[index].artist + (!artistIsCorrect ? '     \u274C     ( ' + music.artist + ' )' : ' \u2705'),
          title: this.state.answers[index].title + (!titleIsCorrect ? '     \u274C     ( ' + music.title + ' )' : ' \u2705'),
        };

        correction.lines.push(line);
        correction.points += artistIsCorrect + titleIsCorrect;
      });

      this.props.socket.emit('sendCorrection', correction);
    }
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
        />
        <MediaPlayer admin={this.state.admin} socket={this.props.socket}/>
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
          <li>
            <Link to={{
              pathname: "/results",
              state: {
                answers: this.state.answers,
                userName: this.state.userName,
                musics: this.state.musics,
              },
            }}>
              <button
              id={'submit'}
              className={"button"}
              type={"submit"}
              onClick={() => {
                this.sendCorrection();
              }}
              disabled={!this.state.endReached}
              >
                <span>Résultats </span>
              </button>
            </Link>
          </li>
      </div>
    )
  }
}

export default Play;