import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/nav.css'

class Nav extends Component {

  render() { 
    console.log(this.props)
    const {loggedUserAvatar, loggedUser} = this.props
    return (
      <nav className="nav">
        <Link className='nav-link' to="/" >Home</Link> 
        <Link className='nav-link' to="/add" >New Question</Link>  
        <Link className='nav-link' to="/leaderboard" >Leader Board</Link>    
        <div className='nav-login'>
          <img 
            className='nav-login-avatar'
            src={loggedUserAvatar} 
            alt={`avatar of ${loggedUser}`}
          />
          <span className='nav-login-name'>{loggedUser}</span>
          <Link className='nav-logout' to="/">Logout</Link>
        </div>
      </nav>
  );}
}


function mapStateToProps( { users, authedUser } ){
  const loggedUser = authedUser && users[authedUser].name
  const loggedUserAvatar = authedUser && users[authedUser].avatarURL

  return { 
    loggedUserAvatar,
    loggedUser
  };
}

export default connect(mapStateToProps)(Nav);