import React from 'react'
import TextField from 'material-ui/TextField'

// const renderTextField = props => {
//   console.log(props)
//   return (
//     <span className={`inputBlock ${props.className}`}>
//       <TextField
//         {...props.input}
//         value={props.v || ''}
//         floatingLabelText={props.label}
//         fullWidth={props.fullWidth}
//         name={props.name}
//         placeholder={props.placeholder}
//         type={props.type}
//         id={props.id}
//         onChange={(event, value) => props.input.onChange(value)}
//       />
//     </span>
//   )
// }

const renderTextField = ({ className, input, label, meta: { touched, error, warning }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    className={`inputBlock ${className}`}
    errorText={touched && error}
    {...input}
    {...custom}
  // onChange={(event, index, value) => input.onChange(value)}
  />
)

export default renderTextField
