import { NavLink, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  state = {
    logout: false,
  }

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(""))

    this.setState(() => ({
      logout: true
    }))
  }

  render () {
    const { logout } = this.state
    if (logout === true) {
        return <Redirect to='/logout' />
    }
    return (
      <nav>
        {this.props.authedUser &&
        <ul className='navStart'>
          <li>
            <NavLink to='/dashboard' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' activeClassName='active'>
              Welcome, <b>{this.props.authedUser}</b>
            </NavLink>
          </li>
          <li>
            <NavLink to='/logout' activeClassName='active'>
              <button onClick={this.handleLogout}>
                Logout
              </button>
            </NavLink>
          </li>
        </ul>
        }
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser,
  }
}
export default connect(mapStateToProps)(Nav)