import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    }
  }

  componentDidMount() {
    this.props.socket.emit('getScores');
    this.props.socket.on('setScores', (scores) => {
      this.setState({ scores })
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

  render() {
    return(
      <div id={'main'}>
        <h2>
          Résultats
        </h2>
          <table>
            <thead>
            <tr>
              <th>Classement</th>
              <th>Utilisateur</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {this.renderTableData()}
            </tbody>
          </table>
      </div>
    )
  }
}

export default Results;