import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corrections : [],
      scores: [],
      userName: this.props.location.state.userName,
    }
  }

  componentDidMount() {
    this.props.socket.on('setCorrections', (corrections, scores) => {
      this.setState({corrections, scores})
    });
    this.props.socket.emit('getCorrections');
  }

  correctionTable = () => {
    if (this.state.corrections.length !== 0) {
      let correction = {};

      this.state.corrections.forEach((userCorrection) => {
        console.log(userCorrection);
        if (userCorrection.user === this.state.userName) {
          correction = userCorrection;
        }
      });

      return (
        <>
        <h2>{`${correction.user} : ${correction.points} points`}</h2>
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Artiste</th>
            <th>Titre</th>
          </tr>
          </thead>
          <tbody>
            {this.renderCorrection(correction.correction)}
          </tbody>
        </table>
        </>
      )
    }
  };

  renderCorrection(correction) {
    return correction.map((line) => {
      return (
        <tr key={line.id - 1}>
          <td>{line.id}</td>
          <td>{line.artist}</td>
          <td>{line.title}</td>
        </tr>
      )
    })
  }

  scoresTable = () => {
    if (this.state.scores.length !== 0) {
      return (
        <>
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
                {this.renderScores()}
            </tbody>
          </table>
        </>
      )
    }
  };

  renderScores() {

    const scores = this.state.scores.sort((a, b) => {
      if (a.points > b.points) {
        return -1
      } else if (a.points < b.points){
        return 1
      } else {
        return 0
      }
    });

    return scores.map((score, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td onClick={() => this.setState({ userName: score.user })} style={{cursor: 'pointer'}}>
            {score.user}
          </td>
          <td>{score.points}</td>
        </tr>
      )
    })
  }

  render() {
    return(
      <div id={'main'}>
        {this.scoresTable()}
        {this.correctionTable()}
      </div>
    )
  }
}

export default Results;