import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import ListComponent from './components/list'
import { List } from 'material-ui/List'

import { CircularProgress, DataNotFound } from './../../components/'
import { patientAction } from './../../redux/actions/patient'
import { _function } from '../../function';

class RevokeProviderPage extends Component {
  componentWillMount() {
    // if (this.props.patientId) {
    //   this.props.getPatient(this.props.patientId)
    // }
  }

  componentWillUpdate() {
    // if (this.props.patientId && isEmpty(this.props.checkup) && isEmpty(this.props.patients) && isEmpty(this.props.healthCareProvider)) {
    //   this.props.getAllCheckup(this.props.patientId)
    // }
  }
  render() {
    const { patientId, patientPermissionRequestList, healthCareProvider } = { ...this.props }
    let providerList = []
    // console.log(patientId, patientPermissionRequestList)
    let renderHTML = (
      <CircularProgress className={`--loadCard`} />
    )
    if (patientPermissionRequestList && !patientPermissionRequestList.length) {
      renderHTML = (
        <DataNotFound />
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
                      <Link to={{
                        pathname: `/revokeprovider/${v.key}`,
                        state: { data: v }
                      }}> <ListComponent data={v} /> </Link>
                    </div>
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
          {renderHTML}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (patientId) => {
      dispatch(patientAction.getPatient(patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patientPermissionRequestList: state.patient.data.authorizedHcpPermissionRequest,
    healthCareProvider: state.healthCareProvider.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RevokeProviderPage)
