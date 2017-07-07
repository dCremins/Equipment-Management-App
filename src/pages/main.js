import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {
  firebaseConnect,
//  isLoaded,
//  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import List from './list';
import '../css/main.css';


class Main extends Component {
  addItem = () => {
    const { newThing } = this.refs
    const { firebase } = this.props
    firebase.push('/test', {
      text: newThing.value,
      done: false
    })
    newThing.value = ''
  }

  render() {

    return (
      <div className="main mainPage">
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


const wrappedTodos = firebaseConnect([
  {
    path: '/test/computer',
    storeAs: 'computer',
  },
  {
    path: '/test/cord',
    storeAs: 'cord',
  },
])(Main)

export default connect(
  ({firebase}) => ({
    computer: dataToJS(firebase, '/computer'),
    cord: dataToJS(firebase, '/cord'),
  })
)(wrappedTodos)
