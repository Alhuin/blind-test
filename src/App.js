import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Play from './containers/Play';
import Auth from './containers/Auth';
import Loading from './containers/Loading';
import Results from './containers/Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact render={(props) => <Auth {...props} />} />
            <Route path="/loading" render={(props) => <Loading {...props} />} />
            <Route path="/play" render={(props) => <Play {...props} />} />
            <Route path="/results" render={(props) => <Results {...props} />} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;