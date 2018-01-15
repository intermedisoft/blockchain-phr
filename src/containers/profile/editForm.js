import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Select } from './../../components'

const prefixMock = ['นาย', 'นางสาว', 'นาง']
const ProfileEditForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <div>คำนำหน้าชื่อ</div>
      <div>
        <Field data={prefixMock} component={Select} name={'prefix'} placeholder={'ชื่อ'} />
      </div>
      <div>ชื่อ</div>
      <div>
        <Field component={Input} name={'name'} placeholder={'ชื่อ'} />
      </div>
      <div><button type='submit'>ลงทะเบียน</button></div>
    </form>
  )
}
export default reduxForm({
  form: 'ProfileEditForm'
})(ProfileEditForm)
