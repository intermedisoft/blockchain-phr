import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CircularProgress from 'material-ui/CircularProgress'
import { LoadingDot } from './../../../components/'

class NotificationUnread extends Component {
  render() {
    const { permissionUnread, checkupHistoryUnread } = { ...this.props }
    return (
      permissionUnread && checkupHistoryUnread
        ? <span className={`notiBlock`}>{permissionUnread + checkupHistoryUnread}</span>
        : <LoadingDot sizeDot='5px' />
    )
  }
}

const mapStateToProps = state => ({ permissionUnread: state.permission.unRead, checkupHistoryUnread: state.checkup.checkupHistory.unRead })
export default connect(mapStateToProps)(NotificationUnread)
