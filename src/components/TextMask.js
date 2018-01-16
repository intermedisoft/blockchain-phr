import React from 'react'
import MaskedInput from 'react-text-mask';

import { Input } from './index'

// class TextMaskCustom extends React.Component {
//   render() {
//     return (
//       <MaskedInput
//         {...this.props}
//         mask={this.props.mask}
//         placeholderChar={'\u2000'}
//         showMask
//       />
//     );
//   }
// }

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

const renderMaskedInput = props => (
  <Input
    {...props.input}
    inputComponent={TextMaskCustom}
    fullWidth={props.fullWidth}
    label={props.label}
    maxLength={props.maxLength}
    labelClassName={props.labelClassName}
    name={props.name}
    placeholder={props.placeholder}
    type={props.type}
  />
)

export default renderMaskedInput
