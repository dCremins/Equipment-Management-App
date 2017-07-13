import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firebase } from 'react-redux-firebase'
import SweetAlert from 'sweetalert-react'

import Computer from '../parts/computer'
import Cord from '../parts/cord'

import '../css/inputs.css'
import '../css/add.css'

//const history = createHistory()

class Edit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: 'computer',
      show: false
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(event) {
    this.setState({type: event.target.value})
  }

  submitFormAction = (item) => {
    const { firebase } = this.props
    const type = item.type
    const id = item.id
    firebase.set(`/test/${type}/${id}`, item)
    this.setState({show: true})
  }

  cancel = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const item = this.props.location.state.item
    const {history} = this.props
    let addType = null;
    if (item.type === 'computer') {
      addType =
        <Computer
          addEquipment = {this.addEquipment}
          item = {item}
          submitFormAction = {this.submitFormAction}
          cancel = {this.cancel}
          act='edit'
        />
    } else if (item.type === 'cord') {
      addType =
        <Cord
          addEquipment = {this.addEquipment}
          item = {item}
          submitFormAction = {this.submitFormAction}
          cancel = {this.cancel}
          act='edit'
        />
    }
    return (
        <div className="AddEquipment main">
          <SweetAlert
            show={this.state.show}
            key="alert"
            title="Success!"
            text='This item has been updated.'
            type="success"
            onConfirm={() => {
              this.setState({ show: false })
              history.push('/')
            }}
          />
          <div className="pageLink addLink">
            <Link to="/" aria-describedby="tip1">+</Link>
            <span id="tip1" className="tooltip" role="tooltip" >Return to List</span>
          </div>
          <div className="addContainer">
            <h1 className="addTitle">Edit Equipment</h1>
            <div name="addItem">
              {addType}
            </div>
          </div>
        </div>
      )
  }

}


export default firebase()(Edit)
