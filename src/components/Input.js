import React from 'react'
import TextField from 'material-ui/TextField'
import MaskedInput from 'react-text-mask';


class TextMaskCustom extends React.Component {
  render() {
    console.log('TextMaskCustom')
    return (
      <MaskedInput
        {...this.props}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}

const renderTextField = props => (
  <span className={`inputBlock ${props.className}`}>
    <TextField
      {...props.input}
      fullWidth={props.fullWidth}
      inputComponent={props.inputComponent}
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
