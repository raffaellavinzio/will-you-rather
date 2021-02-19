import React, {Component} from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {

  render() { 
 
    return (
      <div >
        <h1>Would You Rather</h1>
        <ul>
            {this.props.userIds.map(id => 
                <li key={id}>
                  {id}
                    {/* <User id={id} /> */}
                </li>)}
        </ul>
      </div>
  );}
}

function mapStateToProps( { users } ){
    return { userIds: Object.keys(users)}
  }

export default connect(mapStateToProps)(LeaderBoard)