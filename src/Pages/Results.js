import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      musics: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('getScores');
    this.props.socket.on('setScores', (scores, musics) => {
      this.setState({ scores, musics })
    });
  }

  renderTableData() {
    const scores = this.state.scores.sort((a, b) => {
      if (a.points > b.points) {
        return -1
      } else if (a.points < b.points){
        return 1
      } else {
        return 0
      }
    });

    return scores.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.username}</td>
          <td>{user.points}</td>
        </tr>
      )
    })
  }

  renderMusics() {
    return this.state.musics.map((music, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{music.artist}</td>
          <td>{music.title}</td>
        </tr>
      )
    })
  }

  render() {
    return(
      <div id={'main'}>
        <h2>
          Classement
        </h2>
          <table>
            <thead>
            <tr>
              <th>Place</th>
              <th>Utilisateur</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {this.renderTableData()}
            </tbody>
          </table>
        <h2>
          Réponses
        </h2>
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Artiste</th>
            <th>Titre</th>
          </tr>
          </thead>
          <tbody>
          {this.renderMusics()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Results;