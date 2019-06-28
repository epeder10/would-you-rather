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
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ol className='center'>
            {usersSorted.map((user) => (
                <li key={users[user].id}>{users[user].name} Answered {Object.keys(users[user].answers).length} questions</li>
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