import React, { Component } from 'react'
import { LoadingDot } from './../../../components'

class NotificationUnread extends Component {
  render() {
    const { unRead, loading } = { ...this.props }
    return (
      !loading
        ? unRead ? <span className={`notiBlock`}>{unRead > 99 ? '99+' : unRead}</span> : null
        : <LoadingDot sizeDot='5px' bgColor='#00aee5' />
    )
  }
}

export default NotificationUnread
