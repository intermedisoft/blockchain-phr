import React, { Component } from 'react'
import RouteMenu from './../routes/RouteMenu'
class Template extends Component {
  render () {
    return (
      <div>
        {/* <div> THIS IS HEADER</div> */}
        <div className='RouteMenu'>
          <RouteMenu />
        </div>
        {/* <div> THIS IS FOOTER TEMPLATE</div> */}
      </div>
    )
  }
}

export default Template
