import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input} from './../../components'

const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      {/* <div>เลขที่บัตรประชาชน</div> */}
      <div>
        <Field component={Input} id={'cid'} type={'number'} label={'เลขที่บัตรประชาชน'} name={'cid'} maxLength={13} fullWidth inputProps={{min: 13}} className={'center widthMax'} />
      </div>
      <div>
        <button type='submit' className={`btn`}>ลงทะเบียน</button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
