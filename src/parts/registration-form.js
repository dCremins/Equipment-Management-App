import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import 'material-design-icons/iconfont/material-icons.css'

import '../css/inputs.css';


const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="inputFields">
    <div className="inputText">
      {touched &&(error && <span className="reg-errors"><i className="material-icons">error_outline</i>{error}</span>)}
    </div>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
    </div>
  </div>
)

class RegistrationForm extends Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit} className="registrationForm">
        <Field
          type="text"
          component={renderField}
          name="fname"
          placeholder="First Name"
        />
        <Field
          type="text"
          component={renderField}
          name="lname"
          placeholder="Last Name"
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
          name="room"
          placeholder="Office Number"
        />
        <Field
          type="email"
          component={renderField}
          name="email"
          placeholder="sue.didly@ncsu.edu"
        />
        <Field
          type="password"
          component={renderField}
          name="password"
          placeholder="Password"
        />
        <div className="buttonGroup">
          <button type="submit" className="inputFields">Submit</button>
          <button type="button" onClick={this.props.cancel} className="inputFields">Cancel</button>
        </div>
    </form>
    )
  }
}

const validate = formProps => {
  const errors = {}
  if (!formProps.fname) {
    errors.fname = 'Please enter your first name';
  }
  if (!formProps.lname) {
    errors.lname = 'Please enter your last name';
  }
  if (!formProps.program) {
    errors.program = 'Please enter the name of your department or program';
  }
  if (!formProps.room) {
    errors.room = 'Please enter your office or room number';
  }
  if (!formProps.email) {
    errors.email = 'Please enter a valid email';
  }
  if (!formProps.password || (formProps.password.length < 6)) {
    errors.password = 'Please enter a login password of at least 6 characters';
  }
  return errors
}

export default reduxForm({
  form: 'registration', // a unique identifier for this form
  validate
})(RegistrationForm)
