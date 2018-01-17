import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Input, Select, Datepicker } from './../../components'
import MenuItem from 'material-ui/MenuItem'
// import RadioButton from 'material-ui/RadioButton'

import styles from '../../assets/style/themes/pages/profile.scss'

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
      <div className={`${styles.profileEditForm}`}>
        <Field name='prename' id='prename' component={Select} label='คำนำหน้าชื่อ' className={`${styles.small}`}>
          {
            prefixMock.map((v, i) => {
              return (
                <MenuItem key={v} value={v} primaryText={v} />
              )
            })
          }
        </Field>
        <Field name='name' id='name' component={Input} label='ชื่อ' className={`${styles.normal}`} />
        {/* <Field component={Input} name={'name'} id={'name'} label={'ชื่อ'} v={'ทดสอบ'} /> */}
        <Field component={Input} name={'surname'} id={'surname'} label={'นามสกุล'} className={`${styles.normal}`} />
        <Field component={Datepicker} defaultDate={props.data.dob ? new Date(props.data.dob) : new Date()} name={'dob'} id={'dob'} label={'วันเดือนปีเกิด'} />
        <Field name='bloodGroup' id='bloodGroup' component={Select} label='กรุ๊บเลือด' className={`${styles.small}`}>
          {
            bloodMock.map((v, i) => {
              return (
                <MenuItem key={v} value={v} primaryText={v} />
              )
            })
          }
        </Field>
        <Field name='sex' id='sex' component={Select} label='เพศ' className={`${styles.small}`}>
          {
            sexMock.map((v, i) => {
              return (
                <MenuItem key={v.id} value={v.id} primaryText={v.label} />
              )
            })
          }
        </Field>
        <Field name='marriage' id='marriage' component={Select} label='สถานะ' className={`${styles.small}`}>
          {
            marriageMock.map((v, i) => {
              return (
                <MenuItem key={v.id} value={v.id} primaryText={v.label} />
              )
            })
          }
        </Field>
        <Field component={Input} name={'nation'} id={'nation'} label={'สัญชาติ'} className={`${styles.small}`} />
        <Field component={Input} name={'race'} id={'race'} label={'เชื้อชาติ'} className={`${styles.small}`} />
        <Field component={Input} name={'occupation'} id={'occupation'} label={'อาชีพ'} className={`${styles.normal}`} />
        <Field component={Input} name={'height'} id={'height'} label={'ส่วนสูง'} className={`${styles.small}`} />
        <Field component={Input} name={'weight'} id={'weight'} label={'น้ำหนัก'} className={`${styles.small}`} />
      </div>
      <button type='submit' className={`btnPrimary`}>บันทึก</button>
    </form >
  )
}

ProfileEditForm = reduxForm({
  form: 'ProfileEditForm'
})(ProfileEditForm)

formValueSelector('ProfileEditForm')
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
