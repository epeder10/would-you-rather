import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import firebase, { auth, provider } from '../utils/firebase'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      isError: false
    }
  }

  handleChange = (e, option) => {
    const text = e.target.value

    if (option === 'email') {
      this.setState(() => ({
        email: text
      }))
    } else if (option === 'password') {
      this.setState(() => ({
        password: text
      }))
    }
  }
  handleSubmit = (e) => {
    const { email, password } = this.state
    console.log(email);
    auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        const { dispatch } = this.props
        dispatch(setAuthedUser(user.email))

        this.setState(() => ({
          optionA: '',
          optionB: '',
          redirectToReferrer: true
        }))
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        this.setState({error, isError: true});
      });
  }

  render() {
    const { email, password } = this.state
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className='center'>
        <h3 className='center'>Please login to answer questions.</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <p>{this.state.isError ? this.state.error.message : "Login"}</p>
          <div>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => this.handleChange(e, 'email')}
              className='textarea'
              maxLength={280}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => this.handleChange(e, 'password')}
              className='textarea'
              maxLength={280}
            />
          </div>
          <div>
            <button
              className='btn'
              type='submit'
              disabled={email === '' || password === ''}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users: users
  }
}

export default connect(mapStateToProps)(Login)