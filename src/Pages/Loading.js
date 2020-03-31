import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      admin: false,
      userName: this.props.location.state.userName,
    }
  }

  componentDidMount() {
    this.props.socket.on('setUsers', (users) => {
      this.setState({ users })
    });

    this.props.socket.on('begin', () => {
      this.props.history.push({
        pathname: "/play",
        state: { admin: this.state.admin, userName: this.state.userName }
      });
    });

    this.props.socket.on('admin', () => this.setState({admin: true}));
    this.props.socket.emit('getUsers');
  }

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
              userName: this.state.userName,
            }
          }}>
            <button
              className={"button"}
              onClick={()=> this.props.socket.emit('beginPlay')}
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