import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { firebase } from 'react-redux-firebase'
import SweetAlert from 'sweetalert-react'

import Computer from '../parts/computer'
import Cord from '../parts/cord'

import '../css/inputs.css'
import '../css/add.css'

class AddNew extends Component {

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

  addEquipment = (item) => {
    const { firebase } = this.props
    const type = this.state.type
    const id = item.id
    firebase.set(`/test/${type}/${id}`, item)
    this.setState({show: true})
  }

  submitFormAction = (item) => {
    const { firebase } = this.props
    const type = this.state.type
    const id = item.id
    firebase.set(`/test/${type}/${id}`, item)
    this.setState({show: true})
  }

  cancel = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {history} = this.props
    const computer = {
      type: 'computer',
      borrowed: '',
      returned: '',
      last_staff: '',
      id: '',
      staff: '',
      room: '',
      program: '',
      cpu: '',
      os: '',
      hd: '',
      model: '',
      brand: '',
      cost: '',
      bought: '',
      serial: '',
      mac: '',
      login: '',
      cams: '',
      notes: ''
    }
    const cord = {
      type: 'cord',
      borrowed: '',
      returned: '',
      last_staff: '',
      id: '',
      staff: '',
      room: '',
      model: '',
      brand: '',
      cost: '',
      bought: '',
      length: '',
      a: '',
      b: '',
      c: '',
      notes: ''
    }
    //let type = selector(state, 'selectType')
    let addType = null;
    if (this.state.type === 'computer') {
      addType = <Computer
        addEquipment={this.addEquipment}
        item = {computer}
        submitFormAction = {this.submitFormAction}
        cancel = {this.cancel}
        act='add'
      />
    } else if (this.state.type === 'cord') {
      addType = <Cord
        addEquipment={this.addEquipment}
        item = {cord}
        submitFormAction = {this.submitFormAction}
        cancel = {this.cancel}
        act='add'
       />
    }

    return (
        <div className="AddEquipment main">
          <SweetAlert
            show={this.state.show}
            key="alert"
            title="Success!"
            text='This item has been added.'
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
          <div className="addContainer main">
            <h1 className="addTitle">Add New Equipment</h1>
            <div name="addItem main">
              <select
                name="selectType"
                className="inputFields"
                onChange={this.handleUpdate}
                value={this.state.type}>
                <option value="computer">Computer</option>
                <option value="cord">Cord</option>
              </select>
              {addType}
            </div>
          </div>
        </div>
      )

  }

}


export default firebase()(AddNew)
