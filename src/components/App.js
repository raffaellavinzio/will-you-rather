import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import Question from './Question'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  state = {
    loggedIn: false
  }
  
  handleToggleView = () => {
    this.setState(prevState => ({
      loggedin: !prevState.loggedIn
    }));
  }

  render() { 
    return (
      <Router>
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <Nav />
          { this.props.loading ? null :  
          <div>
            <Route path='/' exact component={ Dashboard } />
            <Route path='/questions/:id' exact component={ Question } />
            <Route path='/add' exact component={ AddQuestion } />
            <Route path='/leaderboard' exact component={ LeaderBoard } />
          </div>}
        </div>
      </Fragment>
      </Router>
  );}
}

function mapStateToProps( { authedUser } ){
  return { 
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
