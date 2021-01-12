import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    redirectToReferrer: false,
  }
  handleSelect = (e) => {
    const text = e.target.value
    const { dispatch } = this.props
    dispatch(setAuthedUser(text))

    this.setState(() => ({
      redirectToReferrer: true
    }))
  }

  render() {
    const { users } = this.props
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    console.log(this.props.users);

    return (
      <div>
        <h3 className='center'>Please login to answer questions.</h3>
        <select onChange={this.handleSelect}>
        <option key='default' value=''></option>
          {Object.keys(users).map((user) => (
                <option key={users[user].id} value={users[user].id}>{users[user].name}</option>
          ))}]
        </select>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users: users
  }
}

export default connect(mapStateToProps)(Login)