import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button'
import { Input } from './../../components'

import styles from '../../assets/style/themes/pages/cid.scss'

const CidForm = props => {
  const { handleSubmit } = props
  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      {/* <div>เลขที่บัตรประชาชน</div> */}
      <div>
        <Field component={Input} type={'number'} label={'เลขที่บัตรประชาชน'} name={'cid'} fullWidth={'true'} maxLength={'13'} className={'center widthMax'} />
      </div>
      <div>
        {/* <button>ลงทะเบียน</button> */}
        <Button raised color="primary" type='submit' className={`${styles.btn}`}>ลงทะเบียน</Button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'CidForm'
})(CidForm)
