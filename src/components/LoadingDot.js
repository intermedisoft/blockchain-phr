import React from 'react'

const LoadingDot = ({ sizeDot }) => (

  // <div className='loaderDot' text={sizeDot} style={{ width: sizeDot, height: sizeDot }} />
  <div className='loaderDot' text={sizeDot} style={{ width: sizeDot, height: sizeDot }}>
    <div style={{ width: sizeDot, height: sizeDot }}/>
    <div style={{ width: sizeDot, height: sizeDot }}/>
    <div style={{ width: sizeDot, height: sizeDot }}/>
  </div>

  // {`width: ${sizeDot}; height: ${sizeDot};`}
)

export default LoadingDot
