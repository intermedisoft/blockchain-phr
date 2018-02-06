import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEmpty } from 'react-redux-firebase'
import { patientAction } from './../../redux/actions/patient'
import { Link } from 'react-router-dom'

import { CircularProgress } from './../../components'
import { sexMock } from './../../config/mockData'
import styles from '../../assets/style/themes/pages/profile.scss'

class ProfilePage extends Component {
  componentWillMount() {
    if (this.props.patientId) {
      this.props.getPatient(this.props.patientId)
    }
  }

  componentWillUpdate() {
    if (this.props.patientId && isEmpty(this.props.patients)) {
      this.props.getPatient(this.props.patientId)
    }
  }
  render() {
    const { avatarUrl, patients } = { ...this.props }
    let renderHTML = (
      <CircularProgress className={`--loadCard`} />
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
            <table className={`tableViewColon`}>
              <tbody>
                <tr>
                  <td>BLOOD</td>
                  <td>{patients.bloodGroup}</td>
                </tr>
                <tr>
                  <td>SEX</td>
                  <td>
                    {sexMock.filter((v) => v.id === patients.sex)[0].label}
                  </td>
                </tr>
                <tr>
                  <td>MARRIAGE</td>
                  <td>{patients.marriage}</td>
                </tr>
                <tr>
                  <td>NATION</td>
                  <td>{patients.nation}</td>
                </tr>
                <tr>
                  <td>RACE</td>
                  <td>{patients.race}</td>
                </tr>
                <tr>
                  <td>OCCUPATION</td>
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
    return (
      <div className={`containerMain ${styles.profilePage}`}>
        <div className={`card --avatarInfo`}>
          <div className={`avatarBlock --bigSize --center`}>
            <Avatar
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
    getPatient: (patientId) => {
      dispatch(patientAction.getPatient(patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
