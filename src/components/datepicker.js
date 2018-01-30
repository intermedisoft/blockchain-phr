import React from 'react'
import DatePicker from 'material-ui/DatePicker'
const renderDatePicker = (props) => {
  return (
    <DatePicker
      {...props}
      autoOk
      floatingLabelText={props.label}
      onChange={(e, date) => props.input.onChange(date)}
      hintText={props.label} />
  )
}
export default renderDatePicker
