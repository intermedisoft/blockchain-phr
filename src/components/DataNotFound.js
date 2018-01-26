import React from 'react'

const dataNotFoundComponent = ({ className }) => (
  <div className={`DataNotFound ${className}`}>
    <div className={`iconFile`}></div>
    <div className={`label`}>ไม่พบข้อมูล</div>
  </div>
)

export default dataNotFoundComponent
