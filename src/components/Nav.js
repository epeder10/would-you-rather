import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Nav extends Component {
  render () {
    return (
      <nav>
        <ul className='navStart'>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' activeClassName='active'>
              {this.props.authedUser}
            </NavLink>
          </li>
          <li>
            <NavLink to='/' activeClassName='active'>
              Logout
            </NavLink>
          </li>
        </ul>
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