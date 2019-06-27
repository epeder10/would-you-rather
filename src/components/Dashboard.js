import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { formatQuestions } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    answered: true,
    unanswered: false
  }

  filterSelection = (e) => {
    alert(e)
    if (e === 'all') {
      this.setState((state) => ({
        answered: false,
        unanswered: false
      }))
    } else if (e === 'answered') {
      this.setState((state) => ({
        answered: false,
        unanswered: false
      }))
    } else {
      this.setState((state) => ({
        answered: true,
        unanswered: false
      }))
    }
  }
  render() {
    if (authedUser === null || authedUser === "" || user === null) {
      alert("Redirect")
      return (<Redirect to='/' />)
    }
    const { answered , unanswered } = this.state
    const { user, authedUser} = this.props
    const { id, name, avatarURL, answers, userQuestions } = user
    const unansweredQuestions = this.props.questions.filter((item) => !Object.keys(answers).includes(item))
  
    return (
      <div>
        <div id="center">
          <button class="btn" onClick={(e) => this.filterSelection('all', e)}> Show all</button>
          <button class="btn" onClick={(e) => this.filterSelection('answered', e)}> Answered</button>
          <button class="btn active" onClick={(e) => this.filterSelection('unanswered', e)}> Unanswered</button>
        </div>
        <div className= {answered ? 'hidden' : ''}>
          <h3 className='center'>Your Answered Questions</h3>
          <ul className='dashboard-answered-list'>
          {Object.keys(answers).map((key) => (
            <li key={key}>
              <Question id={key} answer={answers[key]}/>
            </li>
          ))}
          </ul>
        </div>
        <div className= {unanswered ? 'hidden' : ''}>
          <h3 className='center unanswered'>Your Unanswered Questions</h3>
          <ul className='dashboard-unanswered-list'>
            {unansweredQuestions.map((id) => (
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
          </ul>
        </div>
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