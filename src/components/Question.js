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
    const { question } = this.props

    if (question === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo
    } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <div className='question-info'>
          <div>
            <span>Would you Rather {author}</span>
            <div>{formatDate(timestamp)}</div>
            <p>A: {optionOne.text}</p>
            <p>B: {optionTwo.text}</p>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
  }
}

export default withRouter(connect(mapStateToProps)(Question))