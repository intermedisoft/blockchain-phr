import React, { Component } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'

class NotificationUnread extends Component {
  render() {
    return (
      this.props.permission.unRead
        ? <span className={`notiBlock`}>{this.props.permission.unRead}</span>
        : <span><img src={'https://www.creditonebank.com/assets/images/dotdotdot.gif'} alt='Sign in with Google' /> </span>
    )
  }
}

const mapStateToProps = state => ({ permission: state.permission })
export default connect(mapStateToProps)(NotificationUnread)
