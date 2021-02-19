import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/poll-metrics.css';

class PollMetrics extends Component {
  render() {
    const {
      optionOneText,
      optionTwoText,
      optionOneVotes,
      optionTwoVotes,
      totalVotes,
      loggedUserVotedOption,
    } = this.props;

    return (
      <div className="poll-metrics">
        <h4>Results</h4>
        <div className="poll-results">
          {loggedUserVotedOption === 'optionOne' && (
            <span className="poll-tag">Your Vote</span>
          )}
          <p className="poll-question">1. {optionOneText}</p>
          <div className="poll-bar-bg">
            <div
              className="poll-bar"
              style={{ width: `${(optionOneVotes / totalVotes) * 100}%` }}
            >
              {((optionOneVotes / totalVotes) * 100).toFixed(2)}%
            </div>
          </div>
          <p className="poll-votes">
            {optionOneVotes} out of {totalVotes}
          </p>
        </div>
        <div className="poll-results">
          {loggedUserVotedOption === 'optionTwo' && (
            <span className="poll-tag">Your Vote</span>
          )}
          <p className="poll-question">2. {optionTwoText}</p>
          <div className="poll-bar-bg">
            <div
              className="poll-bar"
              style={{ width: `${(optionTwoVotes / totalVotes) * 100}%` }}
            >
              {((optionTwoVotes / totalVotes) * 100).toFixed(2)}%
            </div>
          </div>
          <p className="poll-votes">
            {optionTwoVotes} out of {totalVotes}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id, match }) {
  const question = id ? questions[id] : questions[match.params.id];
  const loggedUserVotedOption = id
    ? users && authedUser && users[authedUser].answers[id]
    : users && authedUser && users[authedUser].answers[match.params.id];

  return {
    optionOneText: question && question.optionOne.text,
    optionTwoText: question && question.optionTwo.text,
    optionOneVotes: question && question.optionOne.votes.length,
    optionTwoVotes: question && question.optionTwo.votes.length,
    totalVotes:
      question &&
      question.optionOne.votes.length + question.optionTwo.votes.length,
    loggedUserVotedOption,
  };
}

PollMetrics.propTypes = {
  optionOneText: PropTypes.string.isRequired,
  optionTwoText: PropTypes.string.isRequired,
  optionOneVotes: PropTypes.string.isRequired,
  optionTwoVotes: PropTypes.string.isRequired,
  totalVotes: PropTypes.string.isRequired,
  loggedUserVotedOption: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(PollMetrics));
