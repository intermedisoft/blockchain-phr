import React from 'react'
import TextField from 'material-ui/TextField'

const renderTextField = props => (
  <span className={`inputBlock ${props.className}`}>
    <TextField
      {...props.input}
      fullWidth={props.fullWidth}
      label={props.label}
      maxLength={props.maxLength}
      labelClassName={props.labelClassName}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
    />
  </span>
)

export default renderTextField
