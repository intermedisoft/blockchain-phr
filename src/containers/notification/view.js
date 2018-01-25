import React, { Component } from 'react'
// import Divider from 'material-ui/Divider'
import moment from 'moment'
import { connect } from 'react-redux'
import { HeaderAction } from './../../redux/actions/header'
// import { Link } from 'react-router-dom';

require('moment/locale/th')

class NotificationViewerPage extends Component {
  // state = {
  //   data: ''
  // }

  cleanPermissionData = (data) => {
    delete data.patientId
    delete data.healthCareProviderId
    delete data.healthCareProviderData
    return data
  }

  handleAllowPermission = (provider) => {
    provider = this.cleanPermissionData(provider)
    provider.permissionType = 'GRANT'
    console.log(provider)
  }

  handleDontAllowPermission = (provider) => {
    provider = this.cleanPermissionData(provider)
    provider.permissionType = 'DENY'
    console.log(provider)
  }

  componentWillMount() {
    this.props.setHeader('Request permission')
  }

  render() {
    const provider = this.props.location.state.data
    // console.log(provider)
    return (
      provider
        ? <div className={`containerMain`}>
          <div className={`card`}>
            <div className={`cardHead`}>Request permission</div>
            <div className={`cardContent`}> Health Care Provider : <b>{provider.healthCareProviderData[0].healthCareProviderName}</b></div>
            <div className={`cardContent`}> Action Date Time : <b>{moment(provider.actionDateTime).format('LLL')}</b></div>
            <div className={`btnAction`}>
              <button onClick={() => this.handleDontAllowPermission(provider)} className={`btnPrimary`}>Don't Allow</button>
              <button onClick={() => this.handleAllowPermission(provider)} className={`btnPrimary`}>Allow</button>
            </div>
          </div>
        </div> : null
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewerPage)