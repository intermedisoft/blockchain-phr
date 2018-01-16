import React from 'react'
import TextField from 'material-ui/TextField'

// class TextMaskCustom extends React.Component {
//   render() {
//     console.log('TextMaskCustom')
//     return (
//       <MaskedInput
//         {...this.props}
//         mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//         placeholderChar={'\u2000'}
//         showMask
//       />
//     );
//   }
// }

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

const renderTextField = ({ className, input, label, meta: { touched, error }, ...custom }) => (
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
