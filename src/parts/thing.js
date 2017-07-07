import React, { Component } from 'react';
import { firebase } from 'react-redux-firebase'

class Thing extends Component {

  render() {
    const {firebase, thing, id} = this.props
    const toggleDone = () => {
      firebase.set(`/test/${id}/done`, !thing.done)
    }

    const deleteTodo = (event) => {
       firebase.remove(`/test/${id}`)
    }
    return (
      <div className="Todo">
        <input
          className="Todo-Input"
          type="checkbox"
          checked={thing.done}
          onChange={toggleDone}
        />
        {thing.text || thing.name}
        <button className="Todo-Button" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    )
  }


}

export default firebase()(Thing)
