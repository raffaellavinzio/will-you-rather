import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import '../styles/nav.css'

class Nav extends Component {

  handleLogout = () => {
    const { dispatch } = this.props

    dispatch(setAuthedUser(null))
  }

  render() { 
    const {loggedUserAvatar, loggedUser, authedUser} = this.props
    return (
      <nav className="nav">
        <NavLink activeClassName="active-link" className='nav-link' exact to="/" >Home</NavLink> 
        <NavLink activeClassName="active-link" className='nav-link' exact to="/add" >New Question</NavLink>  
        <NavLink activeClassName="active-link" className='nav-link' exact to="/leaderboard" >Leader Board</NavLink>    
        {authedUser && <div className='nav-login'>
          <img 
            className='nav-login-avatar'
            src={loggedUserAvatar} 
            alt={`avatar of ${loggedUser}`}
          />
          <span className='nav-login-name'>{loggedUser}</span>
          <button className='nav-logout' to="/" onClick={this.handleLogout}>Logout</button>
        </div>}
      </nav>
  );}
}


function mapStateToProps( { users, authedUser } ){
  const loggedUser = authedUser && users[authedUser].name
  const loggedUserAvatar = authedUser && users[authedUser].avatarURL

  return { 
    loggedUserAvatar,
    loggedUser,
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);