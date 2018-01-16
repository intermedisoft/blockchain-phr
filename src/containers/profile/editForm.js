import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Select } from './../../components'
import MenuItem from 'material-ui/MenuItem'


const prefixMock = ['นาย', 'นางสาว', 'นาง']
const ProfileEditForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <div>
        <Field name='prefix' component={Select} label='คำนำหน้าชื่อ'>
          {
            prefixMock.map((v, i) => {
              return (
                <MenuItem key={v} value={v} primaryText={v} />
              )
            })
          }
        </Field>
      </div>
      <div>
        <Field component={Input} name={'name'} id={'name'} label={'ชื่อ'} />
      </div>
      <div><button type='submit'>ลงทะเบียน</button></div>
    </form>
  )
}
export default reduxForm({
  form: 'ProfileEditForm'
})(ProfileEditForm)
