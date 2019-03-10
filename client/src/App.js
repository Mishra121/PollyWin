import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store'

import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';
import Profile from './components/Profile/Profile'


// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
   // Decode token and get user info and exp
   const decoded = jwt_decode(localStorage.jwtToken);
   // Set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));

   // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Rdirect to login
    window.location.href = '/';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/leaderboard" component={LeaderBoard} />
          <Switch>
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
            />
          </Switch>
          <Footer/>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
