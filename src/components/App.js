import React, { Component, Fragment } from 'react'

import firebase, {auth, provider} from '../utils/firebase'

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
import SignUpPage from './SignUp'

const firebaseAuth = {
  isAuthenticated: false,
  user: null
}




const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    firebaseAuth.isAuthenticated === true
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
    firebaseAuth.isAuthenticated = this.props.isAuthenticated
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
              <Route path='/signup' component={SignUpPage} />
              <Route path='/error' component={ErrorPage} />
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isAuthenticated: authedUser === null,
    user: authedUser
  }
}

export default connect(mapStateToProps)(App)