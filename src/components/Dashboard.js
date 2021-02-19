import React, {Component} from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import '../styles/dashboard.css'

class Dashboard extends Component {
 
  state = {
    toggle: false
  }
  
  handleToggleView = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }


  render() { 
    return (
      <div className="dashboard">
        <div>
          <button className={`dashboard-btn ${!this.state.toggle && "active"}`} onClick={this.handleToggleView}>Unanswered Questions</button>
          <button className={`dashboard-btn ${this.state.toggle && "active"}`} onClick={this.handleToggleView}>Answered Questions</button>
        </div>
        {!this.state.toggle && <ul className="dashboard-list">
            {this.props.unansweredQuestionIds.map(id => 
                <li className="dashboard-item" key={id}>
                    <Question id={id} />
                </li>)}
        </ul>}
        {this.state.toggle && <ul className="dashboard-list">
            {this.props.answeredQuestionIds.map(id => 
                <li className="dashboard-item" key={id}>
                    <Question id={id} />
                </li>)}
        </ul>}
      </div>
  );}
}


function mapStateToProps( { questions, authedUser } ){
  const isAnswered = (question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
  const answered = Object.fromEntries(Object.entries(questions).filter(entry =>  isAnswered(entry[1])))
  const unanswered = Object.fromEntries(Object.entries(questions).filter(entry =>  !isAnswered(entry[1])))

  return { 
    answeredQuestionIds: Object.keys(answered)
    .sort((a,b) => answered[b].timestamp - answered[a].timestamp),
    unansweredQuestionIds: Object.keys(unanswered)
    .sort((a,b) => unanswered[b].timestamp - unanswered[a].timestamp),  
  };
}

export default connect(mapStateToProps)(Dashboard);