import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Poll from './Poll';
import NotFound from './NotFound';
import '../styles/question.css';

class Question extends Component {
  render() {
    const { author, avatar, text, id, match, questionIds } = this.props;

    if (!questionIds.includes(match.params.id) && !questionIds.includes(id)) {
      return <NotFound />;
    }

    return (
      <div className="question">
        <h3 className="question-title">{author} asks</h3>
        <div className="question-body">
          <img src={avatar} alt={`avatar of ${author}`} />
          <div>
            <h4>Would You Rather</h4>
            {id && <p>...{text.slice(0, 10)}...</p>}
            {id && (
              <Link to={`/questions/${id}`} className="question-link">
                View Poll
              </Link>
            )}
            {!id && <Poll id={match.params.id} />}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id, match }) {
  const question = id ? questions[id] : questions[match.params.id];
  const questionIds = Object.keys(questions);

  return {
    author: question && users[question.author] && users[question.author].name,
    avatar:
      question && users[question.author] && users[question.author].avatarURL,
    text: question && question.optionOne.text,
    questionIds,
  };
}

Question.defaultProps = {
  id: '',
  author: '',
  avatar: '',
  text: '',
};

Question.propTypes = {
  author: PropTypes.string,
  avatar: PropTypes.string,
  text: PropTypes.string,
  questionIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Question));
