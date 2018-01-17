import React from 'react'
import SelectField from 'material-ui/SelectField'

const renderSelectField = ({ input, label, className, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    className={className}
    {...custom} />
)

export default renderSelectField
