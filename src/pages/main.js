import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {
  firebaseConnect,
//  isLoaded,
//  isEmpty,
//  pathToJS,
//  dataToJS
} from 'react-redux-firebase'

import List from './list';
import '../css/main.css';


class Main extends Component {
  state = {
    isLoading: false
  }

  counter = 0
/*
  componentWillReceiveProps({ auth }) {
    const {history} = this.props
    if (auth && !auth.uid) {
      history.push('/login') // redirect to /login if not authed
    }
  }
*/
  render() {
    const {auth} = this.props
    const {profile} = this.props

    if (auth && !auth.uid) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { user: profile }
        }}/>
      )
    }

    return (
      <div className="main mainPage">
        <a className="user">{profile.fname} {profile.lname}</a>
        <ul className="userOptions">
          <li><a>Option One</a></li>
          <li><a>Option One</a></li>
          <li><a onClick={this.props.firebase.logout}>Log Out</a></li>
        </ul>
        <div className="pageLink mainLink">
          <Link to="/add" className="addNew" aria-describedby="tip1">+</Link>
          <span id="tip1" className="tooltip" role="tooltip" >Add New Equipment</span>
          </div>
        <div className="mainContainer">
          <h1>Equipment List</h1>
            <List />
        </div>
      </div>
    )
  }
}


const wrappedTodos = firebaseConnect()(Main)

export default connect(
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)(wrappedTodos)
