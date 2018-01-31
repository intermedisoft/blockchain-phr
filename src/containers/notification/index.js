import React, { Component } from 'react'
import ListComponent from './components/list'
import { connect } from 'react-redux'

import { permissionAction } from './../../redux/actions/permission'
import { checkupAction } from './../../redux/actions/checkup'
import { CircularProgress, DataNotFound } from './../../components/'
class NotificationPage extends Component {
  componentDidMount() {
    this.props.getNotification(this.props.configs, this.props.patientId)
  }
  render() {
    const permission = this.props.permission.data
    const healthCareProvider = this.props.healthCareProvider.data
    console.log('000000000000000000000000000000000000000')
    console.log(permission)
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          {
            !permission.nodata
              ? (permission.length && healthCareProvider.length)
                ? permission.map((v, i) => {
                  v.healthCareProviderData = healthCareProvider.filter((Provider) => {
                    return Provider.healthCareProviderId === v.healthCareProviderId
                  })
                  return (
                    <div key={v.permissionLogId}>
                      <ListComponent data={v} />
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
    getNotification: (configs, patientId) => {
      dispatch(permissionAction.getPermission(configs, patientId))
    },
    getCheckupResultProducedTransaction: (configs) => {
      dispatch(checkupAction.getCheckupResultProducedTransaction(configs))
    }
  }
}

const mapStateToProps = state => (
  {
    permission: state.permission,
    healthCareProvider: state.healthCareProvider,
    patientId: state.firebase.profile.patientId,
    configs: state.firebase.data.configs
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
