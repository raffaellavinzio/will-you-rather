import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Poll from './Poll'
import '../styles/question.css'

class Question extends Component {

  render() { 
    const {author, avatar, text, id, match} = this.props

    return (
      <div className='question'>
        <h3 className="question-title">{author} asks</h3>
        <div className="question-body">
          <img src={avatar} alt={`avatar of ${author}`}/>
          <div > 
            <h4>Would You Rather</h4>
            {id && <p>...{text.slice(0,10)}...</p>}
            {id && <Link to={`/questions/${id}`} className='question-link'>View Poll</Link>}
            {!id && <Poll id={match.params.id} />} 
          </div>
        </div>
      </div>
  );}
}

function mapStateToProps( { users, questions }, { id, match } ){

    const question = id ? questions[id] : questions[match.params.id]

    return {
        author: users[question.author].name,
        avatar: users[question.author].avatarURL,
        text: question.optionOne.text
    }
  }

export default withRouter(connect(mapStateToProps)(Question))