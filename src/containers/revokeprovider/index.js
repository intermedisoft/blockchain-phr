import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
// import { Link } from 'react-router-dom'
import ListComponent from './components/list'
import { List } from 'material-ui/List'

import { CircularProgress, DataNotFound, DialogConfirmDelete } from './../../components/'
import { patientAction } from './../../redux/actions/patient'
import { DialogAction } from './../../redux/actions/dialog'
import { _function } from '../../function'
import { revokeProviderAction } from '../../redux/actions/revokeprovider'

class RevokeProviderPage extends Component {
  state = {
    isDone: false
  }
  handleOpenDialog = (title, textBody, fn) => {
    this.props.openDialog(title, textBody, fn)
  }
  handleRevokeProvider = (data) => {
    let data2 = { ...data }
    let patientId = data2.patientId
    data2.patient = `resource:com.depa.blockchain.core.Patient#${patientId}`
    data2.permissionType = 'REVOKE'
    delete data2.key
    delete data2.patientId
    delete data2.healthCareProviderName

    this.handleOpenDialog('Confirm', 'Are you sure to revoke this Provider ?', () => {
      this.props.update(data2, patientId)
      this.setState({
        isDone: true
      })
    })
  }

  render() {
    const { patientId, patientPermissionRequestList, healthCareProvider, isLoading } = { ...this.props }
    let providerList = []

    let renderHTML = (
      <CircularProgress className={`--loadCard`} />
    )

    if (patientPermissionRequestList && !patientPermissionRequestList.length) {
      renderHTML = (
        <DataNotFound />
      )
    } else if (isLoading) {
      renderHTML = (
        <CircularProgress className={`--loadCard`} />
      )
    } else {
      if (!isEmpty(patientPermissionRequestList) && !isEmpty(healthCareProvider)) {
        let patientPermissionRequestListClean = patientPermissionRequestList.filter(function (item, pos) {
          return patientPermissionRequestList.indexOf(item) === pos
        })

        // patientPermissionRequestListClean.map((v, i) => {
        patientPermissionRequestListClean.forEach((v, i) => {
          providerList.push({
            key: i,
            healthCareProviderName: healthCareProvider.filter((Provider) =>
              Provider.healthCareProviderId === _function.popHash(v)
            )[0].healthCareProviderName,
            healthCareProvider: v,
            patientId
          })
        })

        renderHTML = (
          <div>
            <List>
              {
                providerList.map((v, i) => {
                  return (
                    <div key={v.key}>
                      <ListComponent handleClick={() => this.handleRevokeProvider(v)} data={v} />
                    </div>
                    // <div key={v.key}>
                    //   <Link to={{
                    //     pathname: `/revokeprovider/${v.key}`,
                    //     state: { data: v }
                    //   }}> <ListComponent data={v} /> </Link>
                    // </div>
                  )
                })
              }
            </List>
          </div>
        )
      }
    }
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div>Provider List</div>
          </div>
          {renderHTML}
          <DialogConfirmDelete />
          {/* <button onClick={() => this.handleOpenDialog('Confirm Revoke This Provider', '', this.xx)}>CLICK SHOW DIALOG</button> */}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (patientId) => {
      dispatch(patientAction.getPatient(patientId))
    },
    openDialog: (title, textBody, fn) => {
      dispatch(DialogAction.displayDialog(title, textBody, fn))
    }, update: (data, patientId) => {
      dispatch(revokeProviderAction.updateRevokeProvider(data, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patientPermissionRequestList: state.patient.data.authorizedHcpPermissionRequest,
    healthCareProvider: state.healthCareProvider.data,
    isLoading: state.revokeprovider.isLoading
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RevokeProviderPage)
