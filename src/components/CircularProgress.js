import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const CircularProgressComponent = ({className}) => (
  <div className={`progressBlockCircular ${className}`}>
    <CircularProgress />
  </div>
)

export default CircularProgressComponent
