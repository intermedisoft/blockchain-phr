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

const renderTextField = props => (
  <span className={`inputBlock ${props.className}`}>
    <TextField
      {...props.input}
      floatingLabelText={props.label}
      fullWidth={props.fullWidth}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      id={props.id}
    />
  </span>
)

export default renderTextField
