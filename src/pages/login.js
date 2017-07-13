import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import swal from 'sweetalert'
import SweetAlert from 'sweetalert-react'
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import '../css/main.css';


class Login extends Component {
  state = {
    isLoading: false,
    show: false,
    show2: false,
    error: false,
    eMessage: '',
    email: '',
    pass: ''
  }

  Login = (e, p) => {
    this.setState({isLoading: true}) //Forces page refresh
    return this.props.firebase
      .login({
// ******** Change this!!!!! to an actual login prompt *********
        email: e,
        password: p
// *************************************************************
      })
      .then(() => {this.setState({isLoading: false, show: false, show2: false}) //Forces page refresh
      })
      .catch((error) => {
        this.setState({isLoading: false, error: true, eMessage: error.message})
        console.log('there was an error', error)
        console.log('user: ', e)
        console.log('pass: ', p)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  Logout = () => {
    this.setState({isLoading: true})
    return this.props.firebase
      .logout()
      .then(() => {this.setState({isLoading: false}) //Forces page refresh
      })
      .catch((error) => {
        this.setState({isLoading: false, error: true, eMessage: this.props.authError.message})
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError) // thanks to connect
      })
  }

  button = () => {
    this.setState({show: true})
  }


  render() {
    const { auth } = this.props
    const { profile } = this.props

    if (!isLoaded(auth)) {
//Show something while the program loads
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
//Allow users to login
      return (
        <div className="main mainPage">
          <SweetAlert
            show={this.state.show}
            key="email"
            title="Sign In"
            text='Please enter your email'
            type="input"
            inputType="email"
            inputPlaceholder="sue.didly@ncsu.edu"
            showCancelButton
            onConfirm={inputValue => {
              if (inputValue === '') {
                swal.showInputError('You need to write something!');
                return;
              } else {
                this.setState({
                  email: inputValue,
                  show2: true,
                })
              }
            }}
            onCancel={() => {
             this.setState({ show: false });
           }}
          />
          <SweetAlert
            show={this.state.show2}
            key="password"
            title={this.state.email}
            text='Please enter your password'
            type="input"
            inputType="password"
            inputPlaceholder="Password"
            showCancelButton
            onConfirm={inputValue => {
              if (inputValue === '') {
                swal.showInputError('You need to write something!');
                return;
              } else {
                this.Login(this.state.email, inputValue);
              }
            }}
            onCancel={() => {
             this.setState({ show2: false });
           }}
          />


          <SweetAlert
            show={this.state.error}
            key="error"
            title="Error!"
            text={this.state.eMessage}
            type="error"
            onConfirm={() => {
              this.setState({
                show2: false,
                show: false,
                email: '',
                pass: '',
                error: false });
            }}
          />


          <div className="pageLink mainLink">
          </div>
          <div className="mainContainer">
            <span>Login page</span>
            <button onClick={this.button}>Login</button>
          </div>
        </div>
      )
    }

    if (isLoaded(profile)) {
//after logging in reroute to the home page
      return (
        <Redirect to={{
          pathname: '/',
          state: { user: profile }
        }}/>
      )
    }

//show something if I fuck up somewhere before this
    return (
      <div className="main mainPage">
        <div className="pageLink mainLink">
        </div>

        <div className="mainContainer">
          Welcome !

          <button onClick={this.Logout}>Log Out</button>
        </div>
      </div>
    )
  }

}

const wrappedTodos = firebaseConnect()(Login)

export default connect(
  ({ firebase: { auth, profile} }) => ({
    auth, //is logged in (what do they know. do they know stuff? let's find out)
    profile //profile info saved to '/users' as defined in the store
  })
)(wrappedTodos)
