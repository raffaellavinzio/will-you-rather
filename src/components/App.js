import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import handleInitialData from '../actions/shared';
import Dashboard from './Dashboard';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import Question from './Question';
import Login from './Login';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { isAuth } = this.props;

    return (
      <Router>
        <>
          <LoadingBar />
          <div className="container">
            <Nav />
            <div>
              <Route path="/" exact component={isAuth ? Dashboard : Login} />
              <Route
                path="/questions/:id"
                exact
                component={isAuth ? Question : Login}
              />
              <Route
                path="/add"
                exact
                component={isAuth ? AddQuestion : Login}
              />
              <Route
                path="/leaderboard"
                exact
                component={isAuth ? LeaderBoard : Login}
              />
            </div>
          </div>
        </>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isAuth: authedUser !== null,
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
