import React, { Component } from 'react'

class Error extends Component {

  render() {
    return (
      <div className='center'>
        <h1 >404</h1>
        <h3>An Error occurred trying to load the page</h3>
        <a href="/"><p>Click here to retrun to the login page</p></a>
      </div>
    )
  }
}


export default Error