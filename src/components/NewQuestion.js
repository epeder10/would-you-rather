import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'

class NewQuestion extends Component {
  state = {
    optionA: '',
    optionB: '',
    toHome: false,
  }
  handleChange = (e, option) => {
    const text = e.target.value

    if (option === 'optionA'){
      this.setState(() => ({
        optionA: text
      }))
    } else if (option === 'optionB'){
      this.setState(() => ({
        optionB: text
      }))
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionA, optionB } = this.state
    const { dispatch, id, users, authedUser } = this.props

    dispatch(handleAddQuestion(optionA, optionB, users[authedUser].id))

    this.setState(() => ({
      optionA: '',
      optionB: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionA, optionB, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/dashboard' />
    }

    const { authedUser } = this.props

    if (authedUser === null || authedUser === "") {
      alert("You must login before viewing this page. Redirecting to homepage.")
      return (<Redirect to='/' />)
    }
    return (
      <div className='center'>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <p>Would you rather?</p>
          <div>
            <input
              placeholder="Option A"
              value={optionA}
              onChange={(e) => this.handleChange(e, 'optionA')}
              className='textarea'
              maxLength={280}
            />
          </div>
          <div>
            <input
              placeholder="Option B"
              value={optionB}
              onChange={(e) => this.handleChange(e, 'optionB')}
              className='textarea'
              maxLength={280}
            />
          </div>
          <div>
            <button
              className='btn'
              type='submit'
              disabled={optionA === '' || optionB === ''}>
                Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(NewQuestion)