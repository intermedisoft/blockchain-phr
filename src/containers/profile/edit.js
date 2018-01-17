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
    const { patientId, patients, configs, err } = { ...this.props }
    console.log(patients)
    if (isEmpty(patients) && !err) {
      this.props.getPatient(configs, patientId)
      return false
    }
    const { displayName, avatarUrl } = { ...this.props }
    return (
      <div className={`containerMain ${styles.profilePage}`}>
        <div className='card avatarInfo'>
          <div className="avatarBlock bigSize center">
            <Avatar
              alt={displayName}
              backgroundColor={'#ffffff'}
              src={avatarUrl}
            />
          </div>
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
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)