import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import '../styles/leaderboard.css';

const LeaderBoard = ({ users }) => (
  <div className="leaderboard">
    <ul className="leaderboard-list">
      {users.map((user) => (
        <li className="leaderboard-item" key={user.id}>
          <User id={user.id} />
        </li>
      ))}
    </ul>
  </div>
);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users).sort((a, b) =>
      Object.keys(a.answers).length + a.questions.length <
      Object.keys(b.answers).length + b.questions.length
        ? 1
        : -1
    ),
  };
}

LeaderBoard.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(LeaderBoard);
