import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import '../styles/login.css'

class Login extends Component {

  state = {
    redirectToReferrer: false,
    value: ''
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmitLogin = (event) => {
    event.preventDefault();
    const { dispatch } = this.props

    if (this.state.value) {
      this.setState(prevState => ({
        redirectToReferrer: !prevState.redirectToReferrer
      }));

      dispatch(setAuthedUser(this.state.value ? this.state.value : null))
    }
  }
 
  render() { 
    const users = this.props.users && this.props.users 
 
    return (
      <form className="login" onSubmit={this.handleSubmitLogin}>
        <h1>Login</h1>

        <select  
          className='login-select'
          value={this.state.value}
          onChange={this.handleChange}
        >  
          <option key={`select user`} value={`select user`}>Select User</option>
          {users && Object.values(users).map(user => 
            <option key={user.name} value={user.id}>{user.name}</option>)}
        </select>
        <input className='login-btn' type="submit" value="Submit" />
      </form>  
  );}
}


function mapStateToProps( { users } ){

  return { 
    users
  }
}

export default connect(mapStateToProps)(Login);