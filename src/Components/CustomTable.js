import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CustomTable extends Component {

  renderAuthTable = () => {
    const { updateArtist, updateTitle, updateLink } = this.props;
    const rows = [];

    for (let i=0; i < 5; i++) {
      rows.push(
        <TableRow key={i + 1}>
          <TableCell><input className={i + 1 + ' input'} onChange={updateArtist}/></TableCell>
          <TableCell><input className={i + 1 + ' input'} onChange={updateTitle} /></TableCell>
          <TableCell><input className={i + 1 + ' input'} onChange={updateLink} /></TableCell>
        </TableRow>)
    }

    return (
      <Table aria-label="Tes musiques">
        <TableHead>
          <TableRow>
            <TableCell>Artiste</TableCell>
            <TableCell>Titre</TableCell>
            <TableCell>Lien Youtube</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    );
  };

  renderLoadingTable = () => {
    const { users } = this.props;

    return (
      <Table aria-label="Joueurs">
        <TableHead>
          <TableRow>
            <TableCell align={"center"}>Joueur</TableCell>
            <TableCell align={"center"}>Musiques ajoutées</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align={"center"}>{user.name}</TableCell>
                  <TableCell align={"center"}>{user.nbMusics}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  };

  renderPlayTable = () => {
    const { updateArtist, updateTitle, musics, endReached, playing } = this.props;

    return (
      <Table aria-label="Tes réponses">
        <TableHead>
          <TableRow>
            <TableCell align={"center"}>Artiste</TableCell>
            <TableCell align={"center"}>Titre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            musics.map((music) => {
              return (
                <TableRow key={music.id}  className={!endReached && playing === music.id ? "playing" : ""}>
                  <TableCell>
                    <input id={`${music.id}.0`} className={music.id + ' input'} onChange={updateArtist}/>
                  </TableCell>
                  <TableCell>
                    <input id={`${music.id}.1`} className={music.id + ' input'} onChange={updateTitle}/>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    );
  };

  renderScoresTable = () => {
    const { scores, updateUserName } = this.props;

    const sortedScores = scores.sort((a, b) => {
      if (a.points > b.points) {
        return -1
      } else if (a.points < b.points){
        return 1
      } else {
        return 0
      }
    });

    return (
      <Table aria-label="Classement">
        <TableHead>
          <TableRow>
            <TableCell align={"center"}>Place</TableCell>
            <TableCell align={"center"}>Joueur</TableCell>
            <TableCell align={"center"}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            sortedScores.map((score, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align={"center"}>{index + 1}</TableCell>
                  <TableCell
                    align={"center"}
                    style={{cursor: "pointer"}}
                    onClick={() => updateUserName(score.user)}
                  >
                    {score.user}
                  </TableCell>
                  <TableCell align={"center"}>{score.points}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  };

  renderCorrectionTable = () => {
    const { correction } = this.props;

    return (
      <Table aria-label="Classement">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align={"center"}>Artiste</TableCell>
            <TableCell align={"center"}>Titre</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            correction.map((line) => {
              return (
                <TableRow key={line.id - 1}>
                  <TableCell align={"center"}>{line.id}</TableCell>
                  <TableCell align={"center"}>{line.artist}</TableCell>
                  <TableCell align={"center"}>{line.title}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  };

  renderTable = () => {
    const { type } = this.props;

    switch (type) {
      case "Auth":
        return this.renderAuthTable();
      case "Loading":
        return this.renderLoadingTable();
      case "Play":
        return this.renderPlayTable();
      case "Scores":
        return this.renderScoresTable();
      case "Correction":
        return this.renderCorrectionTable();
      default:
        return;
    }
  };

  render() {
    return (
      <TableContainer className={'table'} component={Paper}>
          {this.renderTable()}
      </TableContainer>
    );
  }
}

export default CustomTable;