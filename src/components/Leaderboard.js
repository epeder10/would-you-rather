import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  state = {
    all: false,
    answered: false,
    unanswered: true
  }

  render() {
    const { usersSorted, users , authedUser} = this.props

    if (authedUser === null || authedUser === "") {
      alert("You must login to view the leaderboard. Redirecting to homepage.")
      return (<Redirect to='/' />)
    }

    return (
      <div className='center'>
        <h3 >Leaderboard</h3>
        <ol>
          {usersSorted.map((user) => (
            <li key={users[user].id}>
              <div className='question'>
                <img
                  src={users[user].avatarURL}
                  alt={`Avatar of ${users[user].name}`}
                  className='avatar'
                />
                <h3>{users[user].name}</h3>
                <div>
                  <p className='right'>Answered {Object.keys(users[user].answers).length}</p>
                  <p className='right'>Created {Object.keys(users[user].questions).length}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users: users,
    usersSorted: Object.keys(users)
        .sort((a,b) => Object.keys(users[a].answers).length < Object.keys(users[b].answers).length),
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(Leaderboard)