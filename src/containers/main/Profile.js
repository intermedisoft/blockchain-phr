import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styles from '../../assets/style/themes/pages/mainMenu.scss'
import { patientAction } from './../../redux/actions/patient'

// moment.locale('th-TH')

const avatarstyles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 120,
    height: 120
  },
  colorwhite: {
    color: 'white'
  },
  bigsize: {
    fontSize: 22,
    cursor: 'pointer'
  }
}

class ProfileComponent extends Component {
  // componentWillMount() {
  //   const { configs } = { ...this.props }
  //   console.log('Component Will Mouint')
  //   console.log(configs)
  //   this.props.getPatient()
  // }
  // componentDidMount() {
  //   const { patientId, avatarUrl, patients, configs } = { ...this.props }
  //   console.log(patientId, avatarUrl, patients, configs)
  // }

  render() {
    const { patientId, avatarUrl, patients, configs } = { ...this.props }
    if (isEmpty(patients)) {
      this.props.getPatient(configs, patientId)
    }
    return (
      isEmpty(patients)
        ? <div className={styles.profile} style={avatarstyles.colorwhite}>
          <span>Profile Loading...</span>
        </div>
        : <div className={styles.profile} style={avatarstyles.colorwhite}>
          <div className={styles.profile}>
            <div className={`${styles.item} ${styles.image}`}>
              <div className={styles.userImage}>
                <img src={avatarUrl} alt='Logo' />
              </div>
            </div>
            <div className={`${styles.item} ${styles.profileName}`}>
              <span className={styles.nameLabel}> <Link style={avatarstyles.bigsize} className={styles.item} to='/profile'>{`${patients.prename}${patients.name} ${patients.surname}`} ></Link></span>
              <span className={styles.nameMore}></span>
            </div>
            <div className={`${styles.item} ${styles.profileInfo}`}>
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
              <div className={styles.itemInfo}>{patients.bloodGroup}</div>
              <div className={styles.itemInfo}>{patients.sex}</div>
            </div>
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
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data,
    configs: state.firebase.data.configs
  }
)

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileComponent)
