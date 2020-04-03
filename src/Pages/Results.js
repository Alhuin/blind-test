import React, { Component } from 'react';
import CustomTable from "../Components/CustomTable";
import {Link} from "react-router-dom";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      corrections : [],
      scores: [],
      userName: this.props.userName,
      end: false,
    }
  }

  componentDidMount() {
    const { socket, history }  = this.props;

    if (socket === null) {
      history.push({
        pathname: "/",
      });
    } else {
      socket.on('setCorrections', (corrections, scores, nbUsers) => {
        this.setState({corrections, scores});
        if (corrections.length === nbUsers) {
          socket.disconnect();
          this.setState({ end: true })
        }
      });
      socket.emit('getCorrections');
    }
  }

  render() {
    const { scores, corrections } = this.state;
    const { logout } = this.props;
    let correction = null;

    if (corrections.length !== 0) {
      corrections.forEach((userCorrection) => {
        if (userCorrection.user === this.state.userName) {
          correction = userCorrection;
        }
      });
    }

    return(
      <div id={'resultsMain'}>
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
        <li>
          <Link to={{
            pathname: "/",
          }}>
            <button
              className={"button"}
              type={"submit"}
              onClick={logout}
              disabled={!this.state.end}
            >
              <span>Nouvelle partie </span>
            </button>
          </Link>
        </li>
      </div>
    )
  }
}

export default Results;