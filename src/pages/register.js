import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import RegistrationForm from '../parts/registration-form'

import '../css/main.css';


class Register extends Component {

  render() {
    return (
      <div>
        <div className="pageLink mainLink">
        </div>
        <RegistrationForm onSubmit={this.handleSubmit} cancel={this.cancel} />
      </div>
    )
  }

  cancel = () => {
    const {history} = this.props
    history.push('/login')
  }

  handleSubmit = (creds) => {
    const {history} = this.props
    const { createUser, login } = this.props.firebase
    const prof = {
      email: creds.email,
      fname: creds.fname,
      lname: creds.lname,
      program: creds.program,
      room: creds.room,
      level: 'staff'
    }
    return createUser(creds, prof)
      .then(() => login(creds))
      .then(() => {
        history.push('/')
      })

  }

}

const wrappedTodos = firebaseConnect()(Register)

export default connect(
  ({ firebase: { auth, profile} }) => ({
    auth, //is logged in (what do they know. do they know stuff? let's find out)
    profile //profile info saved to '/users' as defined in the store
  })
)(wrappedTodos)
