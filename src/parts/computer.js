import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import 'material-design-icons/iconfont/material-icons.css'

import '../css/inputs.css';



const validate = formProps => {
  const errors = {}
  if (!formProps.id) {
    errors.id = 'Please enter an ITRE ID';
  }
  if (!formProps.room) {
    errors.room = 'Please enter the location';
  }
  return errors
}

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="inputFields">
    <div className="inputText">
      <label className="inputLabel">{placeholder}</label>
      {(error && <span className="errors"><i className="material-icons">error_outline</i>{error}</span>)}
    </div>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
    </div>
  </div>
)

class Computer extends Component {

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      "type": 'computer',
      "borrowed": this.props.item.borrowed,
      "returned": this.props.item.returned,
      "last_staff": this.props.item.last_staff,
      "bought": this.props.item.bought,
      "warranty": this.props.item.warranty,
      "staff": this.props.item.staff,
      "id": this.props.item.id,
      "room": this.props.item.room,
      "program": this.props.item.program,
      "cpu": this.props.item.cpu,
      "os": this.props.item.os,
      "hd": this.props.item.hd,
      "model": this.props.item.model,
      "brand": this.props.item.brand,
      "cost": this.props.item.cost,
      "serial": this.props.item.serial,
      "mac": this.props.item.mac,
      "login": this.props.item.login,
      "cams": this.props.item.cams,
      "maintenance": this.props.item.maintenance,
      "notes": this.props.item.notes
    };

    this.props.initialize(initData);
  }

  handleFormSubmit(formProps) {
    this.props.submitFormAction(formProps);
  }

  render() {
    const { handleSubmit } = this.props;
    let idField
    let extraInfo
    if (this.props.act === 'edit') {
      idField = <Field type="text" component={renderField} name="id" placeholder="ITRE ID" disabled='true' />
      extraInfo = <div className="inputInfo inputFields inputLabel">
        <p>
          Borrowed: {this.props.item.borrowed}
        </p>
        <p>
          Returned: {this.props.item.returned}
        </p>
      </div>
    } else {
      idField = <Field type="text" component={renderField} name="id" placeholder="ITRE ID"/>
      extraInfo = ''
    }

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="itemForm">
        {extraInfo}
        {idField}
        <Field
          type="text"
          component={renderField}
          name="room"
          placeholder="Room"
          required
        />
        <Field
          type="text"
          component={renderField}
          name="staff"
          placeholder="Staff Member"
        />
        <Field
          type="text"
          component={renderField}
          name="program"
          placeholder="Program"
        />
        <Field
          type="text"
          component={renderField}
          name="serial"
          placeholder="Serial Number"
        />
        <Field
          type="text"
          component={renderField}
          name="mac"
          placeholder="MAC Address"
        />
        <Field
          type="text"
          component={renderField}
          name="cams"
          placeholder="CAMS"
        />
        <Field
          type="text"
          component={renderField}
          name="model"
          placeholder="Model"
        />
        <Field
          type="text"
          component={renderField}
          name="brand"
          placeholder="Brand"
        />
        <Field
          type="text"
          component={renderField}
          name="price"
          placeholder="Price"
        />
        <Field
          type="text"
          component={renderField}
          name="cpu"
          placeholder="CPU"
        />
        <Field
          type="text"
          component={renderField}
          name="os"
          placeholder="System OS"
        />
        <Field
          type="text"
          component={renderField}
          name="hd"
          placeholder="Hard Drive Size"
        />
        <Field
          type="text"
          component={renderField}
          name="login"
          placeholder="Computer Login ID"
        />
        <Field
          type="text"
          component={renderField}
          name="bought"
          placeholder="Date Purchased"
        />
        <Field
          type="text"
          component={renderField}
          name="warranty"
          placeholder="Warranty Expiration"
        />
        <Field
          type="text"
          component={renderField}
          name="Maintenance"
          placeholder="Last Maintenance Date"
        />
        <Field
          type="textarea"
          component={renderField}
          name="notes"
          placeholder="Additional Notes"
        />
        <div className="buttonGroup">
          <button type="submit" className="inputFields">Submit</button>
          <button type="button" onClick={this.props.cancel} className="inputFields">Cancel</button>
        </div>
    </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const form = reduxForm({
  form: 'computer',
  validate
})

export default withRouter(connect(mapStateToProps)(form(Computer)));
