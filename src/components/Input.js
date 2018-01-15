import React from 'react'
import TextField from 'material-ui/TextField'

const renderTextField = props => (
  <TextField
    {...props.input}
    type={props.type}
    name={props.name}
    placeholder={props.placeholder}
  />
)

export default renderTextField
