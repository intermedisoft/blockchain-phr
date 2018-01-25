import React, { Component } from 'react'
import { connect } from 'react-redux'
class NotificationUnread extends Component {
  render() {
    return (
      this.props.permission.unRead
        ? <span className={`notiBlock`}>{this.props.permission.unRead}</span> : null
    )
  }
}

const mapStateToProps = state => ({ permission: state.permission })
export default connect(mapStateToProps)(NotificationUnread)
