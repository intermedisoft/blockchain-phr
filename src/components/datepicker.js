import React from 'react'
import DatePicker from 'material-ui/DatePicker'
const renderDatePicker = (props) => {
  return (
    <DatePicker
      {...props}
      floatingLabelText={props.label}
      hintText={props.label} />
  )
}
export default renderDatePicker
