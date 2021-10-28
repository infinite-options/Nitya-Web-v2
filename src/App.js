
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from 'react-router';
import axios from "axios";

import Navigation from './Navigation/navigation'
import Home from './Home/Home';
import Footer from './Footer/Footer';


function App() {

  return (
    <div className="App">
      <Router>
        <div style={{ border: '2px solid red' }}>

          <Navigation />

          <Switch>

            <Route path="/">

              <Home style={{ border: '2px solid blue' }} />

            </Route>

          </Switch>

          <Footer />

        </div>

      </Router>

    </div>
  );
}

export default App;
