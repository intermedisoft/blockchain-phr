import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Input, Select, Datepicker, Radio } from './../../components'
import MenuItem from 'material-ui/MenuItem'
// import RadioButton from 'material-ui/RadioButton'


const prefixMock = ['นาย', 'นางสาว', 'นาง']
const bloodMock = ['A', 'B', 'O']
const sexMock = [
  { id: 'M', label: 'ชาย' },
  { id: 'F', label: 'หญิง' }
]
const marriageMock = [
  { id: 'Single', label: 'โสด' },
  { id: 'Marriage', label: 'แต่งงานแล้ว' },
  { id: 'F', label: 'อย่าร้าง/ม้าย' }
]

let ProfileEditForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <div>
        <Field name='prename' id='prename' component={Select} label='คำนำหน้าชื่อ'>
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
        <Field name='name' id='name' component={Input} label='ชื่อ' />
        {/* <Field component={Input} name={'name'} id={'name'} label={'ชื่อ'} v={'ทดสอบ'} /> */}
      </div>
      <div>
        <Field component={Input} name={'surname'} id={'surname'} label={'นามสกุล'} />
      </div>
      <div>
        <Field component={Datepicker} name={'dob'} id={'dob'} label={'วันเดือนปีเกิด'} />
      </div>
      <div>
        <Field name='bloodGroup' id='bloodGroup' component={Select} label='กรุ๊บเลือด'>
          {
            bloodMock.map((v, i) => {
              return (
                <MenuItem key={v} value={v} primaryText={v} />
              )
            })
          }
        </Field>
      </div>
      <div>
        <Field name='sex' id='sex' component={Select} label='เพศ'>
          {
            sexMock.map((v, i) => {
              return (
                <MenuItem key={v.id} value={v.id} primaryText={v.label} />
              )
            })
          }
        </Field>
      </div>
      <div>
        <Field name='marriage' id='marriage' component={Select} label='สถานะ'>
          {
            marriageMock.map((v, i) => {
              return (
                <MenuItem key={v.id} value={v.id} primaryText={v.label} />
              )
            })
          }
        </Field>
      </div>
      <div>
        <Field component={Input} name={'nation'} id={'nation'} label={'สัญชาติ'} />
      </div>
      <div>
        <Field component={Input} name={'race'} id={'race'} label={'เชื้อชาติ'} />
      </div>
      <div>
        <Field component={Input} name={'occupation'} id={'occupation'} label={'อาชีพ'} />
      </div>
      <div>
        <Field component={Input} name={'height'} id={'height'} label={'ส่วนสูง'} />
      </div>
      <div>
        <Field component={Input} name={'weight'} id={'weight'} label={'น้ำหนัก'} />
      </div>
      <div><button type='submit' className={`btnPrimary`}>บันทึก</button></div>
    </form >
  )
}

ProfileEditForm = reduxForm({
  form: 'ProfileEditForm'
})(ProfileEditForm)

const selector = formValueSelector('ProfileEditForm')
ProfileEditForm = connect(
  state => ({
    initialValues: state.patient.data // pull initial values from account reducer
  })
  // state => {
  //   const hasPrefixValue = selector(state, 'prefix')
  //   const hasNameValue = selector(state, 'name')
  //   return {
  //     hasPrefixValue,
  //     hasNameValue
  //   }
  // }
)(ProfileEditForm)
export default ProfileEditForm
