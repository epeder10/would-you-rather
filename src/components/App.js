import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Nav from './Nav'
import Login from './Login'
import Logout from './Logout'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'
import ErrorPage from './ErrorPage'

const fakeAuth = {
  isAuthenticated: false,
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
    fakeAuth.isAuthenticated = this.props.isAuthenticated
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <div>
                <Route path='/login' exact component={Login} />
                <Route path='/' exact component={Dashboard} />
                <PrivateRoute path='/leaderboard' component={Leaderboard} />
                <PrivateRoute path='/question/:id' component={QuestionPage} />
                <Route path='/logout' component={Logout} />
                <PrivateRoute path='/add' component={NewQuestion} />
                <Route path='/error' component={ErrorPage} />
              </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    isAuthenticated: authedUser === null
  }
}

export default connect(mapStateToProps)(App)