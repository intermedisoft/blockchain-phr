import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './../assets/images/logo.svg'

const SET_MENU = {
  'main': {
    text: ''
  },
  'notification': {
    text: 'Notification'
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
  }
}
class Header extends Component {
  render() {
    const pathname = this.props.pathname.replace(/\//g, '')
    return (
      <header className='headMain'>
        <div className='contentHead'>
          <div className='itemLeft'>
            <button onClick={() => window.history.back()} className='btnIcon iconBack' />
          </div>
          <div className='itemCenter'>
            {/* {this.props.header} */}
            {SET_MENU[pathname] ? SET_MENU[pathname].text : this.props.header}
            {/* texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext */}
          </div>
          <div className='itemRight logo'>
            <img src={logo} alt='Logo' />
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text
  }
)
export default connect(mapStateToProps)(Header)
