import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input} from './../../components'

const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      {/* <div>เลขที่บัตรประชาชน</div> */}
      <div>
        <Field pattern='[0-9]*' component={Input} id={'cid'} type={'number'} label={'เลขที่บัตรประชาชน'} name={'cid'} fullWidth className={'center widthMax'} />
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
