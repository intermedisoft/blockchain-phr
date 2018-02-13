import React, { Component } from 'react'
// import Divider from 'material-ui/Divider'
import moment from 'moment'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { HeaderAction } from './../../redux/actions/header'
import { permissionAction } from './../../redux/actions/permission'
import { CircularProgress } from './../../components'

// import { Link } from 'react-router-dom';

require('moment/locale/th')

class NotificationViewerPage extends Component {
  // state = {
  //   data: ''
  // }

  cleanPermissionData = (data) => {
    const data2 = { ...data }
    delete data2.patientId
    delete data2.healthCareProviderId
    delete data2.healthCareProviderData
    delete data2.patientResponseResult
    delete data2.$class
    return data2
  }

  updateReading = (data) => {
    const permissionLogId = data.permissionLogId
    if (!data.patientAcknowledgeDateTime) {
      data.patientAcknowledgeDateTime = moment().toISOString()
      delete data.permissionLogId
      this.props.updatePermissionReading(data, permissionLogId)
    } else {
      this.props.receivesetDataOnReading(permissionLogId, false)
    }
  }

  handleAllowPermission = (provider) => {
    provider = this.cleanPermissionData(provider)
    provider.permissionType = 'GRANT'
    this.props.updatePermission(provider)
    // this.props.getNotification(this.props.configs, this.props.patientId)
  }

  handleDontAllowPermission = (provider) => {
    provider = this.cleanPermissionData(provider)
    provider.permissionType = 'DENY'
    this.props.updatePermission(provider)
    // this.props.getNotification(this.props.configs, this.props.patientId)
  }

  componentWillMount() {
    this.props.setHeader('Request permission')
  }

  componentDidMount() {
    const location = { ...this.props.location }
    const provider = this.cleanPermissionData(location.state.data)
    this.updateReading(provider)
    this.props.clearUpdatePermissionData()
  }

  render() {
    let htmlRender = ''
    const provider = this.props.location.state.data
    const permissionOnUpdate = this.props.permissionOnUpdate
    const dataOnReading = this.props.dataOnReading

    if (!dataOnReading.id) {
      htmlRender = <CircularProgress />

    } else {
      // return (
      htmlRender = provider
        ? <div>
          <div className={`cardHead`}>Request permission</div>
          <div className={`cardContent`}> Health Care Provider : <b>{provider.healthCareProviderData[0].healthCareProviderName}</b></div>
          <div className={`cardContent`}> Action Date Time : <b>{moment(provider.actionDateTime).format('LLL')}</b></div>
          {
            isEmpty(permissionOnUpdate.data) ?
              !provider.patientResponseResult || provider.patientResponseResult === 'NOOP' ?
                permissionOnUpdate.isLoading ? <CircularProgress /> :
                  <div className={`btnAction`}>
                    <button onClick={() => this.handleDontAllowPermission(provider)} className={`btnPrimary`}>Don't Allow</button>
                    <button onClick={() => this.handleAllowPermission(provider)} className={`btnPrimary`}>Allow</button>
                  </div> : null
              : null
          }
        </div> : null
      // )
    }
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          {htmlRender}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    }, updatePermission: (data) => {
      dispatch(permissionAction.updatePermission(data))
    }, updatePermissionReading: (data, permissionLogId) => {
      dispatch(permissionAction.updatePermissionReading(data, permissionLogId))
    }, getNotification: (patientId) => {
      dispatch(permissionAction.getPermission(patientId))
    }, clearUpdatePermissionData: () => {
      dispatch(permissionAction.receiveupdatePermissionClearData())
    }, receivesetDataOnReading: (id, reload) => {
      dispatch(permissionAction.receivesetDataOnReading(id, reload))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    header: state.header.text,
    configs: state.firebase.data.configs,
    permissionOnUpdate: state.permission.dataOnUpdate,
    dataOnReading: state.permission.dataOnReading
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewerPage)