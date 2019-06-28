import React, { Component } from 'react'

class Logout extends Component {

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