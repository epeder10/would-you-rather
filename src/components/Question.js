import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  /*handleLike = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: question.id,
      hasLiked: question.hasLiked,
      authedUser
    }))
  }*/
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }
  render() {
    const { question, user, users, authedUser, answer } = this.props

    if (question === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo
    } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={users[author].avatarURL}
          alt={`Avatar of ${users[author].name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            {answer == 'optionOne' && <p><b>{question[answer].text}</b></p>}
            {answer == null && <p>{question.optionOne.text}</p>}
            {answer == 'optionTwo' && <p><b>{question[answer].text}</b></p>}
            {answer == null && <p>{question.optionTwo.text}</p>}
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