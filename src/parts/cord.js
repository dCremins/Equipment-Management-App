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
      {(error && <span className="errors">
      <i className="material-icons">error_outline</i>
      {error}</span>)}
    </div>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
    </div>
  </div>
)

class Cord extends Component {

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      "type": 'cord',
      "borrowed": this.props.item.borrowed,
      "returned": this.props.item.returned,
      "last_staff": this.props.item.last_staff,
      "id": this.props.item.id,
      "staff": this.props.item.staff,
      "room": this.props.item.room,
      "model": this.props.item.model,
      "brand": this.props.item.brand,
      "cost": this.props.item.cost,
      "length": this.props.item.length,
      "a": this.props.item.a,
      "b": this.props.item.b,
      "c": this.props.item.c,
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
      idField = <Field type="text" component={renderField} name="id" placeholder="CRD ID" disabled='true' />
      extraInfo = <div className="inputInfo inputFields inputLabel">
        <p>
          Borrowed: {this.props.item.borrowed}
        </p>
        <p>
          Returned: {this.props.item.returned}
        </p>
      </div>
    } else {
      idField = <Field type="text" component={renderField} name="id" placeholder="CRD ID"/>
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
          name="length"
          placeholder="Cord Length"
        />
        <Field
          type="text"
          component={renderField}
          name="a"
          placeholder="Primary Connector"
        />
        <Field
          type="text"
          component={renderField}
          name="b"
          placeholder="Secondary Connector"
        />
        <Field
          type="text"
          component={renderField}
          name="c"
          placeholder="Optional Connector"
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
  form: 'cord',
  validate
})

export default withRouter(connect(mapStateToProps)(form(Cord)));
