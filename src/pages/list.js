import React, { Component } from 'react'
import SweetAlert from 'sweetalert-react'
import swal from 'sweetalert';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty
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
      kind: '',
      filter: '',
      staff_filter: false,
      change: null
    }
    this.popUp = this.popUp.bind(this)
    this.editItem = this.editItem.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.clearFilters = this.clearFilters.bind(this)
  }

  handleUpdate(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  clearFilters() {
    this.setState({
      type: '',
      filter: '',
      staff_filter: false
    });
  }

  render() {
    return (
      <div className="EquipmentList main">

        <div className="searchContainer">
          <select className="searchInput"
            name="type"
            onChange={this.handleUpdate}
            value={this.state.type}>
            <option value="">All Equipment</option>
            <option value="computer">Computers</option>
            <option value="cord">Cords</option>
          </select>

          <input
          type="text"
          name="filter"
          className="searchInput"
          placeholder="Filter by ID Number"
          onChange={this.handleUpdate}
          value={this.state.filter}
          />

        <label className="checkboxInput">
          <p className="searchInput">Filter by Availablity:</p>
          <input
          type="checkbox"
          name="staff_filter"
          className="searchInput"
          label="Filter by Availablity"
          onChange={this.handleUpdate}
          checked={this.state.staff_filter}
          /></label>

          <button
            className="searchInput"
            onClick={this.clearFilters}>Clear Filters
          </button>
        </div>

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
              this.borrowItem(this.state.id, inputValue, this.state.kind)
            }
          }}
          onCancel={() => {
           this.setState({ show: false });
         }}
        />
        {((this.state.type === 'computer' || this.state.type === '') && <div><h2>Computers</h2>{this.listComputers()}</div>)}
        {((this.state.type === 'cord' || this.state.type === '') && <div><h2>Cords</h2>{this.listCords()}</div>)}

      </div>
    )
  }

  listComputers() {
    const { profile } = this.props
    const { computer } = this.props
    var computerList = !isLoaded(computer)
      ? 'Loading'
      : (isEmpty(computer))
        ? 'No Computers Meet Your Criteria'
        : Object.keys(computer).filter((key) => (
          this.state.filter === '' || (key.toString().toLowerCase()).indexOf(this.state.filter.toString().toLowerCase()) !== -1
        )).filter((key) => (
          this.state.staff_filter === false || (this.state.staff_filter === true && (computer[key]['staff'] === ''))
        )).sort((a, b) => (
          a < b
        )).map((key) => (
          <Item
            key={key}
            id={key}
            type={computer[key]['type']}
            staff={computer[key]['staff']}
            room_length={computer[key]['room']}
            program_a={computer[key]['program']}
            model_b={computer[key]['model']}
            brand_c={computer[key]['brand']}
            user={profile}
            borrowItem={this.borrowItem}
            returnItem={this.returnItem}
            editItem={this.editItem}
            popUp={this.popUp}
          />
        ))
        if (computerList.length === 0) {
          computerList = <div className="property property-failure">No Computers Meet Your Criteria</div>
        }

        let bored = 'Borrow'

        if (profile.level === 'admin') {
          bored = 'Edit'
        }

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
              {bored}
            </div>
          </div>
          {computerList}
          {this.state.change}
        </div>
      )
  }

  listCords() {
    const { profile } = this.props
    const { cord } = this.props
    var cordList = !isLoaded(cord)
      ? 'Loading'
      : (isEmpty(cord))
        ? 'No Cords Meet Your Criteria'
        : Object.keys(cord).filter((key) => (
          this.state.filter === '' || (key.toString().toLowerCase()).indexOf(this.state.filter.toString().toLowerCase()) !== -1
        )).filter((key) => (
          this.state.staff_filter === false || (this.state.staff_filter === true && (cord[key]['staff'] === ''))
        )).sort((a, b) => (
          a < b
        )).map((key) => (
          <Item
            key={key}
            id={key}
            type={cord[key]['type']}
            staff={cord[key]['staff']}
            room_length={cord[key]['room']}
            program_a={cord[key]['a']}
            model_b={cord[key]['b']}
            brand_c={cord[key]['c']}
            user={profile}
            borrowItem={this.borrowItem}
            returnItem={this.returnItem}
            editItem={this.editItem}
            popUp={this.popUp}
          />
        ))
        if (cordList.length === 0) {
          cordList = <div className="property property-failure">No Cords Meet Your Criteria</div>
        }

        let bored = 'Borrow'

        if (profile.level === 'admin') {
          bored = 'Edit'
        }

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
              {bored}
            </div>
          </div>
          {cordList}
          {this.state.change}
        </div>
      )
  }

  popUp(id, type, kind) {
    if (type === 'borrow' && this.state.show === false) {
      this.setState({ show: true, id: id, kind: kind})
    } else {
      this.returnItem(id)
    }
  }

  borrowItem = (id, staff, kind) => {
    const {firebase} = this.props
    const {profile} = this.props
    let tempItem = this.props[kind][id]
    var d = new Date()
    d = d.toString()
    tempItem['borrowed'] = d
    tempItem['returned'] = ''
    tempItem['staff'] = (profile.fname+' '+profile.lname)
    tempItem['room'] = profile.room
    firebase.set(`/test/${kind}/${id}`, tempItem)
    this.setState({ show: false, borrow: false})
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
  ({ firebase: { auth, profile, data: { computer, cord }} }) => ({
    computer,
    cord,
    auth,
    profile
  })
)(wrappedTodos)
