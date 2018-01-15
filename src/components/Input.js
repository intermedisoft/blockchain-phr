import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'

const InputComponent = props => (
  <Field {...props.input} component={TextField} type={props.type} name={props.name} placeholder={props.placeholder} />
)

export default InputComponent
