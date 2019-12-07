import React from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";
import MainContainer from './Containers/MainContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


/**
 * App renders main container
 *Routes are assigned in this file.
 * @returns {*}
 * @constructor
 */
function App() {
  return (
      <div >
        <Router>
          <Switch>
            <Route path="/:keyword?" component={MainContainer}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
