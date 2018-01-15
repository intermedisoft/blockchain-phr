import React from 'react'
import { reduxForm } from 'redux-form'
import { Input } from './../../components'
const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <div>เลขที่บัตรประชาชน</div>
      <div>
        <Input type='number' placeholder={'กรุณากรอกเลขบัตรประชาชน'} name={'cid'} />
      </div>
      <div><button type='submit'>ลงทะเบียน</button></div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
