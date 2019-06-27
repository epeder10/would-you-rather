import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { formatQuestions } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    all: false,
    answered: false,
    unanswered: true
  }

  filterSelection = (e) => {
    if (e === 'all') {
      this.setState((state) => ({
        all: true,
        answered: false,
        unanswered: false
      }))
    } else if (e === 'answered') {
      this.setState((state) => ({
        all: false,
        answered: true,
        unanswered: false
      }))
    } else {
      this.setState((state) => ({
        all: false,
        answered: false,
        unanswered: true
      }))
    }
  }
  render() {
    const { user, authedUser} = this.props
    if (authedUser === null || authedUser === "" || user === null) {
      alert("You must login to view the dashboard. Redirecting to homepage.")
      return (<Redirect to='/' />)
    }
    const { answered , unanswered, all } = this.state
    const { id, name, avatarURL, answers, userQuestions } = user
    const unansweredQuestions = this.props.questions.filter((item) => !Object.keys(answers).includes(item))
  
    return (
      <div>
        <div id="center">
          <button className={all ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('all', e)}> Show all</button>
          <button className={answered ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('answered', e)}> Answered</button>
          <button className={unanswered ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('unanswered', e)}> Unanswered</button>
        </div>
        <div className= {answered || all ? '' : 'hidden'}>
          <h3 className='center'>Your Answered Questions</h3>
          <ul className='dashboard-answered-list'>
          {Object.keys(answers).map((key) => (
            <li key={key}>
              <Question id={key} answer={answers[key]}/>
            </li>
          ))}
          </ul>
        </div>
        <div className= {unanswered || all? '' : 'hidden'}>
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