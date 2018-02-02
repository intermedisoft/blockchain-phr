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

  componentWillMount() {
    if (this.props.patientId) {
      this.props.getPatient(this.props.patientId)
      this.props.getAllCheckup(this.props.patientId)
    }
  }

  componentWillUpdate() {
    if (this.props.patientId && isEmpty(this.props.checkup) && isEmpty(this.props.patients) && isEmpty(this.props.healthCareProvider)) {
      this.props.getPatient(this.props.patientId)
      this.props.getAllCheckup(this.props.patientId)
    }
  }

  render() {
    const { patients, checkup, healthCareProvider } = { ...this.props }

    let renderHTML = (
      <CircularProgress className={`--loadCard`} />
    )
    if (checkup.nodata) {
      renderHTML = (
        <DataNotFound />
      )
    } else if (!isEmpty(checkup)) {
      renderHTML = (
        <div>
          <div className={`cardHead`}>
            <div>รายการประวัติ</div>
            <div> {patients.prename}{patients.name} {patients.surname}</div>
          </div>
          <div className={`cardContent --noMargin`}>
            <List>
              {
                checkup.map((v, i) => {
                  v.healthCareProviderData = healthCareProvider.filter((Provider) => {
                    return Provider.healthCareProviderId === v.healthCareProviderId
                  })
                  return (
                    <div key={v.checkupHistoryId}>
                      <Link to={{
                        pathname: `/checkup/${v.assetId}`,
                        state: { data: v }
                      }}> <CardComponent data={v} /> </Link>
                    </div>
                  )
                })
              }
            </List>
          </div>
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
    getAllCheckup: (patientId) => {
      dispatch(checkupAction.getAllCheckup(patientId))
    },
    getPatient: (patientId) => {
      dispatch(patientAction.getPatient(patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    checkup: state.checkup.data,
    healthCareProvider: state.healthCareProvider.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CheckupPage)
