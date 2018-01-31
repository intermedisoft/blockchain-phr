import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CircularProgress from 'material-ui/CircularProgress'
import { LoadingDot } from './../../../components/'

class NotificationUnread extends Component {
  render() {
    return (
      this.props.permission.unRead
        ? <span className={`notiBlock`}>{this.props.permission.unRead}</span>
        : <LoadingDot sizeDot='5px' />
    )
  }
}

const mapStateToProps = state => ({ permission: state.permission })
export default connect(mapStateToProps)(NotificationUnread)
