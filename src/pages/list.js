import React, { Component } from 'react'
import SweetAlert from 'sweetalert-react'
import swal from 'sweetalert';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'
import Item from '../parts/item'

import '../css/main.css';
import '../css/list.css';
import 'sweetalert/dist/sweetalert.css';

class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      id: '',
      type: '',
      change: null
    }
    this.popUp = this.popUp.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  render() {
    return (
      <div className="EquipmentList main">
        <SweetAlert
          show={this.state.show}
          key="alert"
          title="Equipment Check Out"
          text='Please enter your full name'
          type="input"
          inputType="text"
          inputPlaceholder="Full Name"
          showCancelButton
          onConfirm={inputValue => {
            if (inputValue === '') {
              swal.showInputError('You need to write something!');
              return;
            } else {
              this.borrowItem(this.state.id, inputValue)
            }
          }}
          onCancel={() => {
           this.setState({ show: false });
         }}
        />
        <h2>Computers</h2>
        {this.listComputers()}
        <h2>Cords</h2>
        {this.listCords()}
      </div>
    )
  }

  listComputers() {
    const { computer } = this.props
    const computerList = !isLoaded(computer)
      ? 'Loading'
      : (isEmpty(computer))
        ? 'Computer list is empty'
        : Object.keys(computer).map((key) => (
          <Item
            key={key}
            id={key}
            type={computer[key]['type']}
            staff={computer[key]['staff']}
            room_length={computer[key]['room']}
            program_a={computer[key]['program']}
            model_b={computer[key]['model']}
            brand_c={computer[key]['brand']}
            borrowed={computer[key]['borrowed']}
            borrowItem={this.borrowItem}
            returnItem={this.returnItem}
            editItem={this.editItem}
            popUp={this.popUp}
          />
        ))
      return (
        <div>
          <div className="ComputerHeader" key="Computerlist">
            <div className="property">
              ITRE ID
            </div>
            <div className="property property-staff">
              Staff Member
            </div>
            <div className="property">
              Room
            </div>
            <div className="property">
              Program
            </div>
            <div className="property">
              Model
            </div>
            <div className="property">
              Brand
            </div>
            <div className="property property-button">
              Borrow
            </div>
            <div className="property property-button">
              Delete
            </div>
          </div>
          {computerList}
          {this.state.change}
        </div>
      )
  }

  listCords() {
        const { cord } = this.props
        const cordList = !isLoaded(cord)
          ? 'Loading'
          : (isEmpty(cord))
            ? 'Computer list is empty'
            : Object.keys(cord).map((key) => (
              <Item
                key={key}
                id={key}
                type={cord[key]['type']}
                staff={cord[key]['staff']}
                room_length={cord[key]['room']}
                program_a={cord[key]['a']}
                model_b={cord[key]['b']}
                brand_c={cord[key]['c']}
                borrowed={cord[key]['borrowed']}
                borrowItem={this.borrowItem}
                returnItem={this.returnItem}
                editItem={this.editItem}
                popUp={this.popUp}
              />
            ))

      return (
        <div>
          <div className="ComputerHeader" key="Cordlist">
            <div className="property">
              CRD ID
            </div>
            <div className="property property-staff">
              Staff Member
            </div>
            <div className="property">
              Room
            </div>
            <div className="property">
              A Conn.
            </div>
            <div className="property">
              B Conn.
            </div>
            <div className="property">
              C Conn.
            </div>
            <div className="property property-button">
              Borrow
            </div>
            <div className="property property-button">
              Delete
            </div>
          </div>
          {cordList}
          {this.state.change}
        </div>
      )
  }

  popUp(id, type) {
    if (type === 'borrow' && this.state.show === false) {
      this.setState({ show: true, id: id, type: type})
    } else {
      this.returnItem(id)
    }
  }

  borrowItem = (id, staff, kind) => {
    const {firebase} = this.props
    let tempItem = this.props[kind][id]
    var d = new Date()
    d = d.toString()
    tempItem['borrowed'] = d
    tempItem['returned'] = ''
    tempItem['staff'] = staff
    firebase.set(`/test/${kind}/${id}`, tempItem)
    this.setState({ show: false})
  }

  returnItem = (id, kind) => {
    const {firebase} = this.props
    let tempItem = this.props[kind][id]
    var d = new Date()
    d = d.toString()
    tempItem['returned'] = d
    tempItem['borrowed'] = ''
    tempItem['last_staff'] = tempItem['staff']
    tempItem['staff'] = ''
    firebase.set(`/test/${kind}/${id}`, tempItem)
  }

  editItem = (id, kind) => {
    let tempItem = this.props[kind][id]
    this.setState({change: <Redirect to={{pathname: '/edit', state: { item: tempItem }}}/>})

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
])(List)

export default connect(
  ({firebase}) => ({
    computer: dataToJS(firebase, '/computer'),
    cord: dataToJS(firebase, '/cord'),
  })
)(wrappedTodos)
