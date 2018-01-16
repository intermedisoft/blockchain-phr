import React from 'react'
import MaskedInput from 'react-text-mask'

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
    // console.log('TextMaskCustom')
    console.log(this.props)
    return (
      <MaskedInput
        {...this.props}
        // mask={maskedFormat.cid}
        // mask={this.props.mask}
        mask={[
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          ' ',
          /\d/
        ]}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    keepCharPositions={this.props.keepCharPositions}
                    guide={this.props.guide}
                    required={this.props.required}
                    type='text'
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
}

const renderMaskedInput = props => (
  // console.log(props.mask)
  <span className={`inputBlock textMask ${props.className}`}>
  <Input
    // value={this.state.textmask}
    mask={props.mask}
    inputComponent={TextMaskCustom}
    // onChange={this.handleChange('textmask')}
    className={props.className}
    label={props.label}
    // maxLength={props.maxLength}
    // // labelClassName={props.labelClassName}
    // name={props.name}
    // placeholder={props.placeholder}
    // type={props.type}
  />
  </span>
)

export default renderMaskedInput
