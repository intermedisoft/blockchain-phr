import React from 'react'
import DatePicker from 'react-mobile-datepicker'
// import DatePicker from 'react-datepicker'
// import moment from 'moment'

// import 'react-datepicker/dist/react-datepicker.css'

const renderDatePicker = (props) => {
  console.log(props)
  return (
    <div>
      <DatePicker
        value={new Date()}
        isOpen={false} />
    </div>
  )
}

export default renderDatePicker
