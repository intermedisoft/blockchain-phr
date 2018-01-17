import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEmpty } from 'react-redux-firebase'
import { patientAction } from './../../redux/actions/patient'
import { Link } from 'react-router-dom'

import styles from '../../assets/style/themes/pages/profile.scss'

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
            <div className={`profileColumns ${styles.profileHighlight}`}>
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
            <table>
              <tbody>
                <tr>
                  <td>BLOOD</td>
                  <td>:</td>
                  <td>{patients.bloodGroup}</td>
                </tr>
                <tr>
                  <td>SEX</td>
                  <td>:</td>
                  <td>{patients.sex}</td>
                </tr>
                <tr>
                  <td>MARRIAGE</td>
                  <td>:</td>
                  <td>{patients.marriage}</td>
                </tr>
                <tr>
                  <td>NATION</td>
                  <td>:</td>
                  <td>{patients.nation}</td>
                </tr>
                <tr>
                  <td>RACE</td>
                  <td>:</td>
                  <td>{patients.race}</td>
                </tr>
                <tr>
                  <td>OCCUPATION</td>
                  <td>:</td>
                  <td>{patients.occupation}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Link to='/profile/edit'><button className={`btnPrimary`}>Edit</button></Link>
          </div>
        </div>
      )
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
