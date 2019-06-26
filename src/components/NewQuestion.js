import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    text: '',
    toHome: false,
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { text, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <p>Would you rather?</p>
          <textarea
            placeholder="Answer A"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <textarea
            placeholder="Answer B"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)