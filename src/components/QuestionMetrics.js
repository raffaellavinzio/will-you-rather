import React, {Component} from 'react'
import { connect } from 'react-redux'
import authedUser from '../reducers/authedUser';

class QuestionMetrics extends Component {
  render() { 
    const {question, authedUser, author} = this.props


    return (
      <div >
        {question.id} {authedUser} {author} 
      </div>
  );}
}

function mapStateToProps( { authedUser, users, questions }, { id } ){
    const question = questions[id]
    return {
        authedUser,
        question,
        author: users[question.author].name
    }
  }

export default connect(mapStateToProps)(QuestionMetrics);