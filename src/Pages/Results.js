import React, { Component } from 'react';
import CustomTable from "../Components/CustomTable";

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


  render() {
    const { scores, corrections } = this.state;
    let correction = null;

    if (corrections.length !== 0) {
      corrections.forEach((userCorrection) => {
        if (userCorrection.user === this.state.userName) {
          correction = userCorrection;
        }
      });
    }

    return(
      <div id={'main'}>
        <h2>Classement</h2>
        <CustomTable
          type={"Scores"}
          scores={scores}
          updateUserName={(userName) => this.setState({ userName })}
        />
        { correction !== null && (
          <>
            <h2>{`${correction.user} : ${correction.points} points`}</h2>
            <CustomTable
              type={"Correction"}
              correction={correction.correction}
            />
          </>
        )}
      </div>
    )
  }
}

export default Results;