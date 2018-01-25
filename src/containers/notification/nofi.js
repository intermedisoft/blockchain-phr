import React, { Component } from 'react'
// import { compose } from 'redux'
import { isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import { permissionAction } from './../../redux/actions/permission'
import { healthCareProviderAction } from './../../redux/actions/healthCareProvider'
// import { notificationAction } from './../../redux/actions/notification'

class NotificationActionPage extends Component {
  state = {
    notification: {},
    error: null,
    isData: false
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://192.168.9.88:3000')
    this.ws.onmessage = evt => {
      this.setState({ notification: JSON.parse(evt.data), isData: true })
      NotificationManager.info('You have a new notication', '', 5000, () => {
        window.location.href = '/notification'
      })
    }
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

    // ยังไม่ได้ Filter จะแสดง Alert ขึ้นก็ต่อเมื่อ user ที่ login กับ data#cid เหมือนกันเท่านั้น ยังหาวิธีการดึง cid ใน didMount



    // firebase.database().ref(`users/${auth.uid}`).once('value').then(function (users) {
    //   authenAction(auth.uid)
    //   const user = users.val()
    //   user && user.patientId ? history.push('/main') : history.push('/profile/cid')
    // })

    // this.ws.onmessage = evt => {
    // this.setState({
    // notification: { xxx: 1 }
    // })
    // console.log(this.state)
    // console.log(JSON.parse(evt.data))
    // }
  }
  // componentWillUnmount() {
  //   // this.ws.close()
  // }
  // componentWillMount() {
  //   console.log(2)
  //   console.log(this.props)
  // }
  componentWillUpdate(nextProps, nextState) {
    // const { firebase, uid, profileId } = { ...nextProps }
    // if (nextState.isData && nextState.notification) {
    //   let data = nextState.notification
    //   delete data.$class
    //   firebase.push(`/users/${uid}/notification`, { data })
    //     .then(() => {
    //       console.log('OK')
    //     })
    // }
  }
  render() {
    const { patientId, configs, err, permission } = { ...this.props }
    if (patientId && !err && isEmpty(permission.data)) {
      this.props.getNotification(configs, patientId)
      this.props.getHealthCareProvider(configs)
    }
    return (
      <div>
        <NotificationContainer />
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch, state) => {
//   return {
//     getSocket: () => {
//       dispatch(notificationAction.getSocket())
//     }
//   }
// }

// const mapStateToProps = state => (
//   {

//   }
// )
// export default NotificationActionPage



const mapDispatchToProps = (dispatch, state) => {
  return {
    getNotification: (configs, patientId) => {
      dispatch(permissionAction.getPermission(configs, patientId))
    },
    getHealthCareProvider: (configs) => {
      dispatch(healthCareProviderAction.getHealthCareProvider(configs))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen,
    permission: state.permission
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(NotificationActionPage)