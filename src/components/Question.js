import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }
  render() {
    const { question, users, answer } = this.props

    if (question === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const { id, author, timestamp } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={users[author].avatarURL}
          alt={`Avatar of ${users[author].name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            {answer === 'optionOne' && <p><b>Option A: {question[answer].text}</b></p>}
            {answer == null && <p>Option A: {question.optionOne.text}</p>}
            {answer === 'optionTwo' && <p><b>Option B: {question[answer].text}</b></p>}
            {answer == null && <p>Option B: {question.optionTwo.text}</p>}
          </div>
          <span>Created by: {author} on {formatDate(timestamp)}</span>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id, answer }) {
  const question = questions[id]

  return {
    authedUser,
    users,
    user: users[authedUser],
    question: question,
    answer: answer
  }
}

export default withRouter(connect(mapStateToProps)(Question))