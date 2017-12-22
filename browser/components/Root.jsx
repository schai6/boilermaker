import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';

import { fetchUsers } from '../redux/users';
import { fetchCurrentUser } from '../redux/currentUser';

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  componentDidMount() {
    this.props.fetchInitialData();
  }
  render() {
    return (
      <Router>
        <div id="main" className="container-fluid">
          <Navbar />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null;

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchUsers());
    dispatch(fetchCurrentUser());
  }
});

export default connect(mapState, mapDispatch)(Root);
