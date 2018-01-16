import React from 'react'
import TextField from 'material-ui/TextField'

const renderTextField = props => (
  <TextField
    {...props.input}
    className={`inputBlock ${props.className}`}
    floatingLabelText={props.label}
    fullWidth={props.fullWidth}
    id={props.id}
    label={props.label}
    labelClassName={props.labelClassName}
    maxLength={props.maxLength}
    name={props.name}
    placeholder={props.placeholder}
    type={props.type}
  />
)

export default renderTextField
