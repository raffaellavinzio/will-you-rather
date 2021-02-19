import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import '../styles/login.css';

class Login extends Component {
  state = {
    redirectToReferrer: false,
    value: '',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmitLogin = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { value } = this.state;

    if (value) {
      this.setState((prevState) => ({
        redirectToReferrer: !prevState.redirectToReferrer,
      }));

      dispatch(setAuthedUser(value || null));
    }
  };

  render() {
    const { value } = this.state;
    const { users } = this.props;

    return (
      <form className="login" onSubmit={this.handleSubmitLogin}>
        <h1>Login</h1>

        <select
          className="login-select"
          value={value}
          onChange={this.handleChange}
        >
          <option key="select user" value="select user">
            Select User
          </option>
          {users &&
            Object.values(users).map((user) => (
              <option key={user.name} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        <input className="login-btn" type="submit" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Login);
