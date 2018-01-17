import React, { Component } from 'react'
import { connect } from 'react-redux'

import GetConfig from './../containers/getConfigs'
import RouteMenu from './../routes/RouteMenu'
import Header from './header'
class Template extends Component {
  render () {
    // console.log(this.props)
    return (
      <div>
        <GetConfig />
        <Header pathname={this.props.location.pathname} />
        <div className='RouteMenu'>
          <RouteMenu />
        </div>
        {/* <div> THIS IS FOOTER TEMPLATE</div> */}
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    state: state
  }
)

export default connect(mapStateToProps)(Template)
