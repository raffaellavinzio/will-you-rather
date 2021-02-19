import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import '../styles/add-question.css';

class AddQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  };

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value;

    this.setState(() => ({
      optionOne,
    }));
  };

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value;

    this.setState(() => ({
      optionTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true,
    }));
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="add-question">
        <h1>Create New Question</h1>
        <form className="add-question-form" onSubmit={this.handleSubmit}>
          <p>Complete the question</p>
          <h4>Would you rather...</h4>
          <input
            className="add-question-input"
            type="text"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
          />
          <h4>OR</h4>
          <input
            className="add-question-input"
            type="text"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
          />
          <button
            className="add-question-btn"
            type="submit"
            disabled={optionOne === '' || optionTwo === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

AddQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddQuestion);
