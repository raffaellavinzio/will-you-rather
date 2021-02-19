import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';
import '../styles/dashboard.css';

class Dashboard extends Component {
  state = {
    toggle: false,
  };

  handleToggleView = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };

  render() {
    const { toggle } = this.state;
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;
    return (
      <div className="dashboard">
        <div>
          <button
            type="button"
            className={`dashboard-btn ${!toggle && 'active'}`}
            onClick={this.handleToggleView}
          >
            Unanswered Questions
          </button>
          <button
            type="button"
            className={`dashboard-btn ${toggle && 'active'}`}
            onClick={this.handleToggleView}
          >
            Answered Questions
          </button>
        </div>
        {!toggle && (
          <ul className="dashboard-list">
            {unansweredQuestionIds.map((id) => (
              <li className="dashboard-item" key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
        {toggle && (
          <ul className="dashboard-list">
            {answeredQuestionIds.map((id) => (
              <li className="dashboard-item" key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  const isAnswered = (question) =>
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser);
  const answered = Object.fromEntries(
    Object.entries(questions).filter((entry) => isAnswered(entry[1]))
  );
  const unanswered = Object.fromEntries(
    Object.entries(questions).filter((entry) => !isAnswered(entry[1]))
  );

  return {
    answeredQuestionIds: Object.keys(answered).sort(
      (a, b) => answered[b].timestamp - answered[a].timestamp
    ),
    unansweredQuestionIds: Object.keys(unanswered).sort(
      (a, b) => unanswered[b].timestamp - unanswered[a].timestamp
    ),
  };
}

Dashboard.propTypes = {
  answeredQuestionIds: PropTypes.arrayOf.isRequired,
  unansweredQuestionIds: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
