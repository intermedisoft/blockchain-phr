import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEmpty } from 'react-redux-firebase'
import { patientAction } from './../../redux/actions/patient'
import { Link } from 'react-router-dom'

import styles from '../../assets/style/themes/pages/cid.scss'

class ProfilePage extends Component {
  // componentWillMount() {
  //   this.props.getPatient()
  // }

  render() {
    const { patientId, patients, configs, err } = { ...this.props }
    if (isEmpty(patients) && !err) {
      this.props.getPatient(configs, patientId)
      return true
    }

    let renderHTML = (
      <div> Loading... </div>
    )

    if (!isEmpty(patients)) {
      renderHTML = (
        <div className={`${styles.profileContent}`}>
          <div>
            <div className={`${styles.name}`}>
              {patients.prename} {patients.name} {patients.surname}
            </div>
            <div className={`profileColumns ${styles.profileInfo}`}>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>{moment(patients.dob).format('L')}</div>
                <div className={styles.labelInfo}>Birthday</div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>{patients.weight}</div>
                <div className={styles.labelInfo}>Weight</div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>{patients.height}</div>
                <div className={styles.labelInfo}>Height</div>
              </div>
            </div>
            <div>BLOOD: <span>{patients.bloodGroup}</span></div>
            <div>SEX: <span>{patients.sex}</span></div>
            <div>MARRIAGE: <span>{patients.marriage}</span></div>
            <div>NATION: <span>{patients.nation}</span></div>
            <div>RACE: <span>{patients.race}</span></div>
            <div>OCCUPATION: <span>{patients.occupation}</span></div>
          </div>
          <div>
            <Link to='/profile/edit'> <button>Edit</button></Link>
          </div>
        </div>
      )
    }
    const { displayName, avatarUrl } = { ...this.props }
    return (
      <div className={`containerMain ${styles.profilePage}`}>
        <div className='card avatarInfo'>
          <div class="avatarBlock bigSize center">
            <Avatar
              alt={displayName}
              backgroundColor={'#ffffff'}
              src={avatarUrl}
            />
          </div>
          {renderHTML}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
