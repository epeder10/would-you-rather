import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    const { id, replies } = this.props
    return (
      <div>
        <Question id={id} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, question, users }, props) {
  const { id } = props.match.params

  return {
    id,
    authedUser,
    users,
    user: users[authedUser],
    question: question
  }
}

export default connect(mapStateToProps)(QuestionPage)