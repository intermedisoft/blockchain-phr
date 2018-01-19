import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import ProfileEditForm from './editForm'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { patientAction } from './../../redux/actions/patient'
import { Snackbar } from './../../components'
import styles from '../../assets/style/themes/pages/profile.scss'

class ProfileEdit extends Component {
  state = {}
  render() {
    const { patientId, patients, avatarUrl, configs, err, isLoaded } = { ...this.props }

    if (isEmpty(patients) && !err) {
      this.props.getPatient(configs, patientId)
      return false
    }

    const updatePatient = (data) => {
      if (data.patientId) {
        delete data.patientId
      }
      this.props.editPatient(configs, patientId, data)
    }

    return (
      <div className={`containerMain ${styles.profilePage}`}>
        <div className='card avatarInfo'>
          <div className="avatarBlock bigSize center">
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
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    },
    editPatient: (configs, patientId, data) => {
      dispatch(patientAction.editPatient(configs, patientId, data))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data,
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen,
    isLoaded: state.patient.isLoaded
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)