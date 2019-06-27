import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import TweetPage from './TweetPage'
import Nav from './Nav'
import Login from './Login'
import Logout from './Logout'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Login} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/logout' component={Logout} />
                  <Route path='/new' component={NewQuestion} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)