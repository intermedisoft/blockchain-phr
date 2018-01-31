import React, { Component } from 'react'
import { isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import { permissionAction } from './redux/actions/permission'
import { checkupAction } from './redux/actions/checkup'
import { healthCareProviderAction } from './redux/actions/healthCareProvider'
import { _function } from './function'
import { conf } from './config'

class LoadStarterPage extends Component {
  state = {
    notification: {},
    error: null,
    isData: false
  }

  componentDidMount() {
    this.ws = new WebSocket(conf.WS_URL)
    this.ws.onmessage = evt => {
      let newNotification = JSON.parse(evt.data)
      this.setState({ notification: newNotification, isData: true })
      const patientId = _function.popHash(newNotification.patient)
      const eventType = _function.popHash(newNotification.$class, '.')
 

      if ((patientId === this.props.patientId) && (eventType === 'PermissionRequestEvent')) {
        this.props.getNotification(this.props.configs, this.props.patientId)
        NotificationManager.info('You have a new Permission Request', '', 5000, () => {
          window.location.href = '/notification'
        })
      }
      if ((patientId === this.props.patientId) && (eventType === 'CheckupResultProducedEvent')) {
        this.props.getAllCheckup(this.props.configs, this.props.patientId)
        this.props.getNotification(this.props.configs, this.props.patientId)
        NotificationManager.info('You have a new Checkup Event', '', 5000, () => {
          window.location.href = `/checkup/#${newNotification.checkupHistoryRef.assetId}`
        })
      }

    }
    this.ws.onerror = e => this.setState({ error: 'WebSocket error' })
    this.ws.onclose = e => !e.wasClean && this.setState({ error: `WebSocket error: ${e.code} ${e.reason}` })

  }
  componentWillUpdate(nextProps, nextState) {

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

const mapDispatchToProps = (dispatch, state) => {
  return {
    getNotification: (configs, patientId) => {
      dispatch(permissionAction.getPermission(configs, patientId))
    },
    getHealthCareProvider: (configs) => {
      dispatch(healthCareProviderAction.getHealthCareProvider(configs))
    }, getAllCheckup: (configs, patientId) => {
      dispatch(checkupAction.getAllCheckup(configs, patientId))
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
export default connect(mapStateToProps, mapDispatchToProps)(LoadStarterPage)