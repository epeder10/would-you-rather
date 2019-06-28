import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions.js'

class QuestionPage extends Component {
  state = {
    answer: ''
  }
  handleChange = (e) => {
    const text = e.target.value
    this.setState(() => ({
      answer: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, question, authedUser } = this.props
    
    dispatch(handleAnswerQuestion({authedUser: authedUser, qid: question.id, answer:answer}))

    this.setState(() => ({
      answer: '',
      toHome: true
    }))
  }

  render() {
    const { answer, toHome } = this.state
    const { authedUser, users , question} = this.props
    const { author } = question

    if (authedUser === null || authedUser === ''){
      return (<Redirect to='/error' />)
    }
    if (toHome) {
      return (<Redirect to='/dashboard' />)
    }

    return (
      <div className='center'>
        <h3>Would you Rather</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <div className='question'>
            <img
              src={users[author].avatarURL}
              alt={`Avatar of ${users[author].name}`}
              className='avatar'
            />
            <div className='question-info'>
              <div>
                <input type='radio' name='options' value='optionOne' onChange={this.handleChange}/><span>Option A: {question.optionOne.text}</span>
              </div>
                <div>
                <input type='radio' name='options' value='optionTwo' onChange={this.handleChange}/><span>Option B: {question.optionTwo.text}</span>
              </div>
            </div>
          </div>
          <button
            className='btn center'
            type='submit'
            disabled={answer === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    authedUser,
    users,
    user: users[authedUser],
    question: questions[id]
  }
}

export default connect(mapStateToProps)(QuestionPage)