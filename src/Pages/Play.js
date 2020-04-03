import React, { Component } from 'react';
import MediaPlayer from '../Components/Player';
import Controls from '../Components/Controls';
import { Link } from 'react-router-dom';
import CustomTable from "../Components/CustomTable";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerLaunched: false,
      musics: [],
      answers: [],
      endReached : false,
      playing: 0,
    };

  }

  componentDidMount() {
    const { socket, history } = this.props;

    if (socket === null) {
      history.push({
        pathname: "/",
      });
    } else {
      socket.on('sendMusics', (musics) => {
        const answers = [];
        musics.forEach((music) => {
          answers.push({id: music.id, artist:'', title:''})
        });
        this.setState({ musics, answers });
      });

      socket.on('launch', () => {
        socket.emit('getNextUrl', 0);
      });

      socket.on('endPlaylist', () => {
        this.setState({endReached: true});
      });

      socket.on('nextUrl', (id, url) => {
        this.setState({playing: id})
      });

      socket.emit('getMusics');
    }
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

  updateArtist = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');

    answers.forEach((answerRow) => {
      if (answerId.toString() === answerRow.id.toString()) {
        answerRow.artist = e.target.value;
      }
    });

    this.setState({ answers });
  };

  updateTitle = (e) => {
    const { answers } = this.state;
    const answerId = e.target.className.replace(' input', '');

    answers.forEach((answerRow) => {
      if (answerId.toString() === answerRow.id.toString()) {
        answerRow.title = e.target.value;
      }
    });

    this.setState({ answers });
  };

  sendCorrection() {
    const { socket, userName } = this.props;
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
      socket.emit('sendCorrection', userName, correction);
    }
  }

  render() {
    const { musics, playing, endReached } = this.state;
    const { socket, admin } = this.props;

    return (
      <div id={"main"}>
        <h2>Blind Test</h2>
        <Controls
          admin={admin}
          launch={() => {
            document.getElementById('launch').style.display = 'none';
            socket.emit('launchedPlaylist');
          }}
        />
        <MediaPlayer admin={this.state.admin} socket={socket}/>
        <CustomTable
          type={"Play"}
          updateArtist={this.updateArtist}
          updateTitle={this.updateTitle}
          musics={musics}
          playing={playing}
          endReached={endReached}
        />
        <li>
          <Link to={{
            pathname: "/results",
            state: {
              answers: this.state.answers,
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