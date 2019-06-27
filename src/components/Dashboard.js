import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { formatQuestions } from '../utils/helpers'

class Dashboard extends Component {
  
  render() {
    const { user, authedUser} = this.props
    const { id, name, avatarURL, answers, userQuestions } = user
    const unanswered = this.props.questions.filter((item) => !Object.keys(answers).includes(item))
  
    return (
      <div>
        <h3 className='center'>Your Answered Questions</h3>
        <ul className='dashboard-answered-list'>
        {Object.keys(answers).map((key) => (
          <li key={key}>
            <Question id={key} answer={answers[key]}/>
          </li>
        ))}
        </ul>
        <h3 className='center'>Your Unanswered Questions</h3>
        <ul className='dashboard-unanswered-list'>
          {unanswered.map((id) => (
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
    user: users[authedUser],
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)