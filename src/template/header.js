import React, { Component } from 'react'
import logo from './../assets/images/logo.svg'
const SET_MENU = {
  'main': {
    text: 'Main'
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
    console.log(pathname)
    return (
      <header className='headMain'>
        <div className='contentHead'>
          <div className='itemLeft'>
            <button onClick={() => window.history.back()} className="btnIcon iconBack" />
          </div>
          <div className='itemCenter'>
            {SET_MENU[pathname] ? SET_MENU[pathname].text : ''}
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

export default Header
