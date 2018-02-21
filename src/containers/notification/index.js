import React, { Component } from 'react'
import ListComponent from './components/list'
import { connect } from 'react-redux'

import { permissionAction } from './../../redux/actions/permission'
// import { checkupAction } from './../../redux/actions/checkup'
import { CircularProgress, DataNotFound } from './../../components/'
import { _function } from './../../function'

class NotificationPage extends Component {
  mergeData(permission, checkupHistory) {
    const v1 = permission
    const v2 = checkupHistory
    let data = []
    v1.forEach(e => {
      data.push({
        item: e,
        healthCareProviderId: e.healthCareProviderId,
        actionDateTime: e.actionDateTime,
        type: _function.popHash(e.$class, '.'),
        typeText: 'Request Permission',
        id: e.permissionLogId
      })
    })
    checkupHistory.length && v2.forEach(e => {
      data.push({
        item: e,
        healthCareProviderId: e.checkupHistory.healthCareProviderId,
        actionDateTime: e.checkupHistory.dateTimeServe,
        type: _function.popHash(e.checkupHistory.$class, '.'),
        typeText: 'Checkup Summary',
        id: e.checkupHistory.assetId
      })
    })
    return data.sort((a, b) => new Date(b.actionDateTime) - new Date(a.actionDateTime))
  }
  componentWillMount() {
    if (this.props.reload) {
      this.props.getNotification(this.props.patientId, true)
      // this.props.getCheckupResultProducedTransaction(this.props.patientId)
    }
  }
  render() {

    const permission = this.props.permission.data
    const healthCareProvider = this.props.healthCareProvider.data
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div>Request List</div>
          </div>
          {
            !permission.nodata && !healthCareProvider.nodata
              ? (permission.length && healthCareProvider.length)
                // ? (permission.length && checkupHistory.length && healthCareProvider.length)
                ? this.mergeData(permission, []).map((v, i) => {
                  // ? this.mergeData(permission, checkupHistory).map((v, i) => {
                  v.item.healthCareProviderData = healthCareProvider.filter((Provider) => {
                    return Provider.healthCareProviderId === v.healthCareProviderId
                  })
                  return (
                    <div key={v.id}>
                      <ListComponent val={v} />
                    </div>
                  )
                }) : <CircularProgress />
              : <DataNotFound />
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getNotification: (patientId, loaded) => {
      dispatch(permissionAction.getPermission(patientId, loaded))
    },
    // getCheckupResultProducedTransaction: (patientId) => {
    //   dispatch(checkupAction.getCheckupResultProducedTransaction(patientId))
    // },
    receivesetDataOnReading: (id, reload) => {
      dispatch(permissionAction.receivesetDataOnReading(id, reload))
    }
  }
}

const mapStateToProps = state => (
  {
    permission: state.permission,
    healthCareProvider: state.healthCareProvider,
    patientId: state.firebase.profile.patientId,
    reload: state.permission.dataOnReading.reload
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
