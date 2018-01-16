import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import MaskedInput from 'react-text-mask';
// import NumberFormat from 'react-number-format';
import Button from 'material-ui/Button'

import {Input, TextMask} from './../../components'

const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      {/* <div>เลขที่บัตรประชาชน</div> */}
      <div>
        <Field component={Input} inputComponent={'TextMaskCustom'} type={'number'} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} label={'เลขที่บัตรประชาชน'} name={'cid'} fullWidth={true} maxLength={'13'} className={'center widthMax'} />
      </div>
      <div>
        {/* <button>ลงทะเบียน</button> */}
        <Button raised color="primary" type='submit' className={`btn`}>ลงทะเบียน</Button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
