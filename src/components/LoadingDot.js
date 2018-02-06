import React from 'react'

const LoadingDot = ({ sizeDot, bgColor }) => (

  // <div className='loaderDot' text={sizeDot} style={{ width: sizeDot, height: sizeDot }} />
  <div className='loaderDot' text={sizeDot} style={{ width: sizeDot, height: sizeDot }}>
    <div style={{ width: sizeDot, height: sizeDot, backgroundColor: bgColor }}/>
    <div style={{ width: sizeDot, height: sizeDot, backgroundColor: bgColor }}/>
    <div style={{ width: sizeDot, height: sizeDot, backgroundColor: bgColor }}/>
  </div>

  // {`width: ${sizeDot}; height: ${sizeDot};`}
)

export default LoadingDot
