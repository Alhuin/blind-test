import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomTable from "../Components/CustomTable";
import openSocket from 'socket.io-client';


class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    const { userName, history } = this.props;

    if (userName === '') {
      history.push({
        pathname: "/",
      });
    } else {
      const {userName, addedMusics, setAdmin, setSocket} = this.props;
      const socket = openSocket('http://localhost:8080/');
      setSocket(socket);

      console.log(this.props);
      socket.on('setUsers', (users) => {
        this.setState({users})
      });

      socket.on('begin', () => {
        this.props.history.push({
          pathname: "/play",
        });
      });

      socket.on('admin', () => setAdmin(true));
      socket.emit('enter', userName, addedMusics);
    }
  }


  render() {
    const { users } = this.state;
    const { admin, socket } = this.props;

    return(
      <div id={'main'}>
        <h2>
          En attente d'autres joueurs
        </h2>
        <div className="loader">Loading...</div>
        <div id={'usersContainer'}>
          <CustomTable type={"Loading"} users={users} />
        </div>
        <li>
          <Link to={{
            pathname: "/play",
          }}>
            <button
              className={"button"}
              onClick={()=> socket.emit('beginPlay')}
              disabled={!admin}
            >
              <span>Jouer</span>
            </button>
          </Link>
        </li>
      </div>
    )
  }
}

export default Loading;