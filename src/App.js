import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Play from './Pages/Play';
import Auth from './Pages/Auth';
import Loading from './Pages/Loading';
import Results from './Pages/Results';
import './App.css';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact render={(props) => <Auth {...props} socket={socket}/>} />
            <Route path="/play" render={(props) => <Play {...props} socket={socket}/>} />
            <Route path="/loading" render={(props) => <Loading {...props} socket={socket}/>} />c
            <Route path="/results" render={(props) => <Results {...props} socket={socket}/>} />c
          </Switch>
      </Router>
    </div>
  );
}

export default App;