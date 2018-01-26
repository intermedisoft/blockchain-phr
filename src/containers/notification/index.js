import React, { Component } from 'react'
import ListComponent from './components/list'
import { connect } from 'react-redux'

// import { permissionAction } from './../../redux/actions/permission'
import { LoadingProgress } from './../../components/'
class NotificationPage extends Component {
  render() {
    const permission = this.props.permission.data
    const healthCareProvider = this.props.healthCareProvider.data
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
                }) : <LoadingProgress />
              : <div>ไม่มีข้อมูล</div>
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    // getNotification: (configs, patientId) => {
    // dispatch(permissionAction.getPermission(configs, patientId))
    // }
  }
}

const mapStateToProps = state => (
  {
    permission: state.permission,
    healthCareProvider: state.healthCareProvider
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)
