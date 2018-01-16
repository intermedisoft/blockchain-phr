import React, { Component } from 'react'
import ProfileEditForm from './editForm'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { patientAction } from './../../redux/actions/patient'
class ProfileEdit extends Component {
  state = {}
  render() {
    const { patientId, patients, configs } = { ...this.props }
    console.log(patients)
    if (isEmpty(patients)) {
      this.props.getPatient(configs, patientId)
    }
    return (
      <div className='containerMain'>
        <div className='card'>
          <ProfileEditForm data={patients} />
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    configs: state.firebase.data.configs
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)