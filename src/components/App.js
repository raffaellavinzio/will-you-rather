import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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

  render() { 
    const isAuth = this.props.auth
  
    return (
      <Router>
      <Fragment>
        <LoadingBar />
        <div className='container'>
          <Nav />
          <div>
            <Route path='/' exact component={isAuth ? Dashboard : Login}/>
            <Route path='/questions/:id' exact component={isAuth ? Question : Login} />
            <Route path='/add' exact component={isAuth ? AddQuestion : Login} />
            <Route path='/leaderboard' exact component={isAuth ? LeaderBoard : Login} /> 
          </div> 
        </div>
      </Fragment>
      </Router>
  );}
}

function mapStateToProps( { authedUser } ){
  return { 
    auth: authedUser !== null
  };
}

export default connect(mapStateToProps)(App);
