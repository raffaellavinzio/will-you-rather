import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../styles/dashboard.css'

class Login extends Component {
 
  render() { 
    return (
      <form className="login">
        <select>
          {this.props.users.map(user => <option key={user.name}>{user.name}</option>)
          }
        </select>
      </form>
  );}
}


function mapStateToProps( { authedUser, users } ){

  return { 
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Login);