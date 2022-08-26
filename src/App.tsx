import React, { Suspense } from 'react';
import './App.css';
import 'material-icons';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Suspense>
          <Route exact path="/" render={() => <Home />}></Route>
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
