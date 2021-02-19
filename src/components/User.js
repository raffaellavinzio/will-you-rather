import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/user.css';

class User extends Component {
  render() {
    const { author, avatar, questions, answers } = this.props;

    return (
      <div className="user">
        <div className="user-body">
          <img src={avatar} alt={`avatar of ${author}`} />
          <div>
            <h2 className="user-title">{author}</h2>
            <p className="user-counter">
              <span className="user-count">{answers}</span> answered questions{' '}
            </p>
            <p className="user-counter">
              <span className="user-count">{questions}</span> created questions{' '}
            </p>
          </div>
          <div className="user-score">
            <p>Score</p>
            <span>{answers + questions}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id, match }) {
  const user = id ? users[id] : users[match.params.id];

  return {
    author: user && user.name,
    avatar: user && user.avatarURL,
    answers: (user && Object.keys(user.answers).length) || 0,
    questions: (user && user.questions.length) || 0,
  };
}

User.propTypes = {
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  answers: PropTypes.number.isRequired,
  questions: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps)(User));
