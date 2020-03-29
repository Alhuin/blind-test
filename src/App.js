import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Play from './Pages/Play';
import Auth from './Pages/Auth';
import Loading from './Pages/Loading';
import Results from './Pages/Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact render={(props) => <Auth />} />
            <Route path="/play" render={(props) => <Play />} />
            <Route path="/loading" render={(props) => <Loading />} />
            <Route path="/results" render={(props) => <Results />} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;