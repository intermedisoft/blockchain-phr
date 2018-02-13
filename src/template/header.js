import React, { Component } from 'react'
import { connect } from 'react-redux'
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom'

import logo from './../assets/images/logo.svg'

const SET_MENU = {
  'main': {
    text: ''
  },
  'requestpermission': {
    text: 'Request Permission'
  },
  'profile': {
    text: 'Profile'
  },
  'profilecid': {
    text: 'Set Patient ID'
  },
  'profileedit': {
    text: 'Edit Profile'
  },
  'checkup': {
    text: 'Checkup'
  },
  'xray': {
    text: 'X-Ray'
  },
  'revokeprovider': {
    text: 'Revoke Provider'
  }
}
class Header extends Component {

  // componentDidMount() {

  // }
  render() {
    const pathname = this.props.pathname.replace(/\//g, '')
    return (
      <Headroom className='headMain'>
        <div className='contentHead'>
          <div className='itemLeft'>
            {(pathname !== 'main' && <button onClick={() => window.history.back()} className='btnIcon iconBack' />)}
          </div>
          <div className='itemCenter'>
            {/* {this.props.header} */}
            {SET_MENU[pathname] ? SET_MENU[pathname].text : this.props.header}
            {/* texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext */}
          </div>
          <div className='itemRight logo'>
            <Link to='/main'><img src={logo} alt='Logo' /></Link>
          </div>
        </div>
      </Headroom>
    )
  }
}

const mapStateToProps = state => (
  { header: state.header.text }
)
export default connect(mapStateToProps)(Header)
