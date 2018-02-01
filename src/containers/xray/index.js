import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import CardComponent from './components/card'
import { List } from 'material-ui/List'

import { xrayAction } from './../../redux/actions/xray'
import { CircularProgress, DataNotFound } from './../../components/'

class XrayPage extends Component {

  componentWillMount() {
    if (this.props.patientId) {
      this.props.getAllXray(this.props.patientId)
    }
  }

  componentWillUpdate() {
    if (this.props.patientId && isEmpty(this.props.xray) && isEmpty(this.props.healthCareProvider)) {
      this.props.getAllXray(this.props.patientId)
    }
  }
  render() {
    const { patients, xray, healthCareProvider } = { ...this.props }
    let renderHTML = (
      <CircularProgress className={`--loadCard`} />
    )
    if (xray.nodata) {
      renderHTML = (
        <DataNotFound />
      )
    } else if (!isEmpty(xray)) {
      renderHTML = (
        <div>
          {
            !isEmpty(patients) && (
              <div>รายการประวัติ X-Ray: <span>{patients.prename}{patients.name} {patients.surname}</span></div>
            )
          }
          <List>
            {
              xray.map((v, i) => {
                v.healthCareProviderData = healthCareProvider.filter((Provider) =>
                  Provider.healthCareProviderId === v.healthCareProviderId)
                return (
                  <div key={v.assetId}>
                    <Link to={{
                      pathname: `/xray/${v.assetId}`,
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
    getAllXray: (patientId) => {
      dispatch(xrayAction.getAllXray(patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    xray: state.xray.data,
    healthCareProvider: state.healthCareProvider.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(XrayPage)
