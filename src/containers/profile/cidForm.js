import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from './../../components'
const required = value => (value ? undefined : 'Required')
export const minLengthCid = min => value =>
  value && value.length !== min ? `กรุณากรอกให้ครบ ${min} หลัก` : undefined
export const minLengthCid13 = minLengthCid(13)
const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      {/* <div>เลขที่บัตรประชาชน</div> */}
      <div>
        <Field
          pattern='[0-9]*'
          component={Input}
          id={'cid'}
          name={'cid'}
          type={'number'}
          label={'เลขที่บัตรประชาชน'}
          validate={[required, minLengthCid13]}
          fullWidth
          className={'center widthMax'}
        />
      </div>
      <div>
        <button type='submit' className={`btnPrimary`}>ลงทะเบียน</button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
