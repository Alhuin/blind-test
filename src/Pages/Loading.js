import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
const socket = openSocket('http://82.64.42.159:8080/');

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      admin: false,
    }
  }

  componentDidMount() {
    socket.on('setUsers', (users) => {
      this.setState({ users })
    });
    socket.on('begin', () => {
      this.props.history.push({
        pathname: "/play",
        socket: socket,
        state: { admin: this.state.admin }
      });
    });
    socket.on('admin', () => this.setState({admin: true}));
    socket.emit('getUsers');
  }

  // begin = () => <Redirect to={"/play"}/>;

  renderTableData() {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.nbMusics}</td>
        </tr>
      )
    })
  }

  render() {
    return(
      <div id={'main'}>
        <h2>
          En attente d'autres joueurs
        </h2>
        <div className="loader">Loading...</div>
        <div id={'usersContainer'}>
          <table>
            <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Musiques ajoutées</th>
            </tr>
            </thead>
            <tbody>
            {this.renderTableData()}
            </tbody>
          </table>
        </div>
        <li>
          <Link to={{
            pathname: "/play",
            state: {
              admin: this.state.admin,
              socket: socket,
            }
          }}>
            <button
              className={"button"}
              onClick={()=> socket.emit('beginPlay')}
              disabled={!this.state.admin}
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