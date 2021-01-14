import { NavLink, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

import Header from "./header/Header.js";
import HeaderLinks from "./header/HeaderLinks.js";

class Nav extends Component {
  state = {
    logout: false,
  }

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))

    this.setState(() => ({
      logout: true
    }))
  }

  render() {
    const { logout } = this.state
    if (logout === true) {
      return <Redirect to='/logout' />
    }
    return (
      <nav>
        {this.props.authedUser &&
          <div>
            <Header
              brand="epeder.com"
              links={<HeaderLinks dropdownHoverColor="info" />}
              fixed
              color="info"
              changeColorOnScroll={{
                height: 200,
                color: "info"
              }}
            />
          </div>
        }
      </nav>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  }
}
export default connect(mapStateToProps)(Nav)