import React from 'react'
import TextField from 'material-ui/TextField'

const renderTextField = props => (
  <span className={`inputBlock ${props.className}`}>
    <TextField
      {...props.input}
      floatingLabelText={props.label}
      fullWidth={props.fullWidth}
      label={props.label}
      maxLength={props.maxLength}
      labelClassName={props.labelClassName}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      id={props.id}
    />
  </span>
)

export default renderTextField
