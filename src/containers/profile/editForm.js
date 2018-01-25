import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Input, Select, Datepicker, CircularProgress } from './../../components'
import MenuItem from 'material-ui/MenuItem'
// import RadioButton from 'material-ui/RadioButton'

import styles from '../../assets/style/themes/pages/profile.scss'
import { prefixMock, bloodMock, sexMock, marriageMock } from './../../config/mockData'

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
        <Field component={Datepicker} defaultDate={props.data.dob ? new Date(props.data.dob) : new Date()} name='dob' id='dob' label={'วันเดือนปีเกิด'} className={`${styles.small} ${styles.datePicker}`} />
        <Field name='bloodGroup' id='bloodGroup' component={Select} label='กรุ๊ปเลือด' className={`${styles.small}`}>
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
        <Field component={Input} type='number' name={'height'} id={'height'} label={'ส่วนสูง'} className={`${styles.small}`} />
        <Field component={Input} type='number' name={'weight'} id={'weight'} label={'น้ำหนัก'} className={`${styles.small}`} />
      </div>
      {
        props.isLoaded ? (
          <button disabled={!props.isLoaded} type='submit' className={`btnPrimary`}>บันทึก</button>
        ) : (<CircularProgress />)
      }

    </form >
  )
}

ProfileEditForm = reduxForm({
  form: 'ProfileEditForm'
})(ProfileEditForm)

formValueSelector('ProfileEditForm')
ProfileEditForm = connect(
  state => ({
    initialValues: state.patient.data // pull initial values from account reducer,
    // isLoaded: state.patient.data.isLoaded
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
