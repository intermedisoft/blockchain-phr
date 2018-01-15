import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from './../../components'

// import TextField from 'material-ui/TextField'
const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <div>เลขที่บัตรประชาชน</div>
      <div>
        <Field component={Input} name={'cid'} placeholder={'กรอกเลขที่บัตรประชาชน'} />
      </div>
      <div><button type='submit'>ลงทะเบียน</button></div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
