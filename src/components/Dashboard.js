import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { formatQuestions } from '../utils/helpers'

class Dashboard extends Component {
  
  render() {
    const { users, authedUser} = this.props
    const { id, name, avatarURL, answers, userQuestions } = users
  
    return (
      <div>
        <p>Hello</p>
        <span>{authedUser}</span>
        <h3 className='center'>Your Answered Questions</h3>
        <ul className='dashboard-answered-list'>
        {Object.keys(answers).map((key) => (
          <li key={key}>
            <Question id={key}/>
          </li>
        ))}
        </ul>
        <h3 className='center'>Your Unanswered Questions</h3>
        <ul className='dashboard-unanswered-list'>
          {this.props.questions.map((id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questions: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    users: users,
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)