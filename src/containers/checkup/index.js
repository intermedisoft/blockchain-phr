import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import CardComponent from './components/card'
import { List } from 'material-ui/List'

import { checkupAction } from './../../redux/actions/checkup'
import { patientAction } from './../../redux/actions/patient'
import { CircularProgress, DataNotFound } from './../../components/'
class CheckupPage extends Component {
  render() {
    const { patientId, patients, configs, err, checkup, healthCareProvider } = { ...this.props }
    // console.log(this.props)
    if (isEmpty(patients) && isEmpty(checkup) && !err) {
      this.props.getPatient(configs, patientId)
    }
    if (isEmpty(checkup) && !err && configs && patientId) {
      this.props.getAllCheckup(configs, patientId)
    }
    let renderHTML = (
      <CircularProgress className={`--loadCard`}/>
    )
    if (checkup.nodata) {
      renderHTML = (
        <DataNotFound/>
      )
    } else if (!isEmpty(checkup)) {
      renderHTML = (
        <div>
          <div>รายการประวัติ: <span>{patients.prename}{patients.name} {patients.surname}</span></div>
          <List>
            {
              checkup.map((v, i) => {
                v.healthCareProviderData = healthCareProvider.filter((Provider) => {
                  return Provider.healthCareProviderId === v.healthCareProviderId
                })
                return (
                  <div key={v.checkupHistoryId}>
                    <Link to={{
                      pathname: `/checkup/${v.checkupHistoryId}`,
                      state: { data: v }
                    }}> <CardComponent data={v} /> </Link>
                  </div>
                )
              })
            }
          </List>
        </div>
      )
    }
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          {renderHTML}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getAllCheckup: (configs, patientId) => {
      dispatch(checkupAction.getAllCheckup(configs, patientId))
    },
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen,
    checkup: state.checkup.data,
    healthCareProvider: state.healthCareProvider.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CheckupPage)
