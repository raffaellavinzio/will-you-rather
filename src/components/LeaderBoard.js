import React, {Component} from 'react'
import { connect } from 'react-redux'
import User from './User'
import '../styles/leaderboard.css'

class LeaderBoard extends Component {

  render() { 
    const { users } = this.props

    return (
      <div className='leaderboard'>
        <ul className="leaderboard-list">
        {users.map(user => 
                <li className="leaderboard-item" key={user.id}>
                    <User id={user.id} />
                </li>
                )}
        </ul>
      </div>
  );}
}

function mapStateToProps( { users } ){

    return {
        users : Object.values(users).sort((a, b) => 
        ((Object.keys(a.answers).length + a.questions.length) < (Object.keys(b.answers).length + b.questions.length) ) ? 1 : -1)
    }
  }

export default connect(mapStateToProps)(LeaderBoard)