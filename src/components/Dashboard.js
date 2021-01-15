import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

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
    
    if (this.props.authedUser){
      const { user } = this.props

      const { answered, unanswered, all } = this.state
      const { answers } = user
      const unansweredQuestions = this.props.questions.filter((item) => !Object.keys(answers).includes(item))

      return (
        <div className='center'>
          <div>
            <button className={all ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('all', e)}> Show all</button>
            <button className={answered ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('answered', e)}> Answered</button>
            <button className={unanswered ? 'btn active' : 'btn'} onClick={(e) => this.filterSelection('unanswered', e)}> Unanswered</button>
          </div>
          <div className={answered || all ? '' : 'hidden'}>
            <h3>Your Answered Questions</h3>
            <ul className='dashboard-answered-list'>
              {Object.keys(answers).map((key) => (
                <li key={key}>
                  <Question id={key} answer={answers[key]} />
                </li>
              ))}
            </ul>
          </div>
          <div className={unanswered || all ? '' : 'hidden'}>
            <h3 className='unanswered'>Your Unanswered Questions</h3>
            <ul className='dashboard-unanswered-list'>
              {unansweredQuestions.map((id) => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='center'>
          <div>
            <h3>You must login to answer questions</h3>
            <ul className='dashboard-answered-list'>
              {this.props.questions.map((key) => (
                <li key={key}>
                  <Question id={key} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questions: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    user: users[authedUser],
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(Dashboard)