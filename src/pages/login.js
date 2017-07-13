import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
//import { compose } from 'redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
//  dataToJS,
//  pathToJS
} from 'react-redux-firebase'

import '../css/main.css';


class Login extends Component {
  state = {
    isLoading: false
  }

  Login = loginData => {
    console.log('login')
    this.setState({isLoading: true})
    return this.props.firebase
      .login({
        email: 'drcremin@ncsu.edu',
        password: 'Funiscala1' })
      .then(() => {this.setState({isLoading: false})
      })
      .catch((error) => {
        this.setState({isLoading: false})
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  Logout = () => {
    console.log('logout')
    this.setState({isLoading: true})
    return this.props.firebase
      .logout()
      .then(() => {this.setState({isLoading: false})
      })
      .catch((error) => {
        this.setState({isLoading: false})
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  render() {
    const { auth } = this.props
    //const { users } = this.props
    const { profile } = this.props
    //console.log('users: ', users)
    //console.log('auth: ', auth)
    //console.log('pro: ', profile)

    if (!isLoaded(auth)) {
      return (
        <div className="main mainPage">
          <div className="pageLink mainLink">
          </div>
          <div className="mainContainer">
            <span>Loading...</span>
          </div>
        </div>
      )
    }

    if (isEmpty(auth)) {
      return (
        <div className="main mainPage">
          <div className="pageLink mainLink">
          </div>
          <div className="mainContainer">
            <span>Login page</span>
            <button onClick={this.Login}>Log In!</button>
          </div>
        </div>
      )
    }

    if (!isLoaded(profile)) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { user: profile }
        }}/>
      )
    }

    return (
      <div className="main mainPage">
        <div className="pageLink mainLink">
        </div>

        <div className="mainContainer">
          Welcome {profile.fname} {profile.lname}!

          <button onClick={this.Logout}>Log Out</button>
        </div>
      </div>
    )
  }

}

const wrappedTodos = firebaseConnect(['users'])(Login)

export default connect(
  ({ firebase: { auth, profile, data: { users }} }) => ({
    users,
    auth,
    profile
  })
)(wrappedTodos)
