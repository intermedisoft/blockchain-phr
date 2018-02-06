import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CircularProgress from 'material-ui/CircularProgress'
import { LoadingDot } from './../../../components/'

class NotificationUnread extends Component {
  render() {
    const { permissionUnread, checkupHistoryUnread, loading } = { ...this.props }
    let Unread = permissionUnread + checkupHistoryUnread
    return (
      !loading
        ? Unread ? <span className={`notiBlock`}>{Unread > 99 ? '99+' : Unread}</span> : null
        : <LoadingDot sizeDot='5px' bgColor='#00aee5'/>
    )
  }
}

const mapStateToProps = state => ({
  permissionUnread: state.permission.unRead,
  checkupHistoryUnread: state.checkup.checkupHistory.unRead,
  loading: state.checkup.checkupHistory.unReadLoding
})
export default connect(mapStateToProps)(NotificationUnread)
