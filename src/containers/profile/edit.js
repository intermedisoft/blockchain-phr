import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import ProfileEditForm from './editForm'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { patientAction } from './../../redux/actions/patient'
import styles from '../../assets/style/themes/pages/profile.scss'

class ProfileEdit extends Component {
  state = {}
  render() {
    const { patientId, patients, avatarUrl, isLoaded } = { ...this.props }

    if (isEmpty(patients)) {
      this.props.getPatient(patientId)
      return false
    }

    const updatePatient = (data) => {
      if (data.patientId) {
        delete data.patientId
      }
      this.props.editPatient(patientId, data)
    }

    return (
      <div className={`containerMain ${styles.profilePage}`}>
        <div className={`card --avatarInfo`}>
          <div className={`avatarBlock --bigSize --center`}>
            <Avatar
              backgroundColor={'#ffffff'}
              src={avatarUrl}
            />
          </div>
          <ProfileEditForm isLoaded={isLoaded} data={patients} onSubmit={updatePatient} />
        </div>
        {/* {
          patients.save && (<Snackbar message='บันทึกสำเร็จ' />)
        } */}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (patientId) => {
      dispatch(patientAction.getPatient(patientId))
    },
    editPatient: (patientId, data) => {
      dispatch(patientAction.editPatient(patientId, data))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data,
    isLoaded: state.patient.isLoaded
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)