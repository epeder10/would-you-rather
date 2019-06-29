import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions.js'

class QuestionPage extends Component {
  state = {
    answer: '',
    newQuestion: true
  }

  componentDidMount() {
    if (this.props.authedUser === null || this.props.authedUser === '' || this.props.user === ''){
      return (<Redirect to='/error' />)
    }
    if ( this.props.question.id in this.props.user.answers ) {
      this.setState(() => ({
        newQuestion: false,
        answer: this.props.user.answers[this.props.question.id]
      }))
    }
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
    const { answer, newQuestion, toHome } = this.state
    const { authedUser, users , question} = this.props
    const user = users[authedUser]
    const { author } = question
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes

    if (this.props.authedUser === null || this.props.authedUser === '' || this.props.user === ''){
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
                  { !newQuestion ? 
                    <label><b>{question.optionOne.text}</b></label>
                    :
                    <div>
                      <div>
                        <label><input type='radio' name='options' value='optionOne' onChange={this.handleChange} />Option A: {question.optionOne.text}</label>
                      </div>
                      <div>
                        <label><input type='radio' name='options' value='optionTwo' onChange={this.handleChange} />Option B: {question.optionTwo.text} </label>
                      </div> 
                    </div>
                  }
                </div>
              </div>
            </div>
            { question.id in user.answers ?
              <div>
                <p>Total votes for this option {question.optionOne.votes.length}</p>
                <p>Total votes for this question {totalVotes}</p>
                <p>Total percent votes for this option {(question.optionOne.votes.length / totalVotes ) * 100}%</p>
              </div>
              :
              <button
                className='btn center'
                type='submit'
                disabled={answer === ''}>
                  Submit
              </button>
            }
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