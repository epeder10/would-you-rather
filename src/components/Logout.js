import React, { Component } from 'react'
import firebase, { auth, provider } from '../utils/firebase'

class Logout extends Component {
  componentDidMount() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
    firebaseAuth.isAuthenticated = this.props.isAuthenticated
  }

  render() {
    return (
      <div>
        <h3 className='center'>You have been logged out.</h3>
        <a href="/"><p className='center'>Click here to login again</p></a>
      </div>
    )
  }
}


export default Logout