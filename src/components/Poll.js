import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import '../styles/poll.css'

class Poll extends Component {
    state = {selectedValue: 'optionOne'};

    handleChange = (e) => {
        this.setState(() => ({
            selectedValue: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { selectedValue} = this.state
        const { authedUser, id, dispatch } = this.props

        dispatch(handleAnswerQuestion(authedUser, id, selectedValue))

        this.setState(() => ({
            selectedValue: 'optionOne'
        }))
    }

  render() { 

    const {optionOne, optionTwo, id} = this.props

    return (
      <form className='poll' onSubmit={(e) => this.handleSubmit(e, id)}>
        <div className='poll-radio' onChange={this.handleChange}>
            <span><input type="radio" value={`optionOne`} name='question' defaultChecked/> {optionOne}</span>
            <span><input type="radio" value={`optionTwo`} name='question' /> {optionTwo}</span>
        </div>
        <button className='poll-btn' type='submit'>Submit</button>
      </form>
  );}
}


function mapStateToProps( { authedUser, questions }, { id } ){

    const question = questions[id]

    return {
        optionOne: question.optionOne.text,
        optionTwo: question.optionTwo.text,
        id,
        authedUser
    }
  }

export default connect(mapStateToProps)(Poll);