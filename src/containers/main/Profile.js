import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
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
  componentWillMount() {
    this.props.getPatient()
  }

  render() {
    const { avatarUrl, patients } = { ...this.props }
    const { prename, name, surname, height, weight, dob, bloodGroup, sex, nation } = { ...patients[0] }
    var m = moment(dob).format('L')
    // console.log(this.props)
    return (
      <div className={styles.profile} style={avatarstyles.colorwhite}>
         
        <div className={styles.profile}>
          <div className={`${styles.item} ${styles.image}`}>
            <div className={styles.userImage}>
              <img src={avatarUrl} alt='Logo' />
            </div>
          </div>
          <div className={`${styles.item} ${styles.profileName}`}>
            <span className={styles.nameLabel}> <Link style={avatarstyles.bigsize} className={styles.item} to='/profile'>{`${prename}${name} ${surname}`} ></Link></span>
            <span className={styles.nameMore}></span>
          </div>
          <div className={`${styles.item} ${styles.profileInfo}`}>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{m}</div>
              <div className={styles.labelInfo}>Birthday</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{weight}</div>
              <div className={styles.labelInfo}>Weight</div>
            </div>
            <div className={styles.itemInfo}>
              <div className={styles.valueInfo}>{height}</div>
              <div className={styles.labelInfo}>Height</div>
            </div>
            <div className={styles.itemInfo}>{bloodGroup}</div>
            <div className={styles.itemInfo}>{sex}</div>
          </div>
        </div>

        {/* <Link style={avatarstyles.bigsize} className={styles.item} to='/profile'>{`${prename}${name} ${surname}`} ></Link>
        <div className={styles.item}>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              {m}<br />
              Birthdate
            </Grid>
            <Grid item xs={6} sm={3}>
              {weight}<br />
              Weight
            </Grid>
            <Grid item xs={6} sm={3}>
              {height}<br />
              Height
            </Grid>
            <Grid item xs={6} sm={3}>
              {bloodGroup} {nation} {sex}
            </Grid>
          </Grid>
        </div> */}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: () => {
      dispatch(patientAction.getPatient())
    }
  }
}

const mapStateToProps = state => (
  {
    avatarUrl: state.firebase.profile.avatarUrl,
    patients: state.patient.data
  }
)

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileComponent)
