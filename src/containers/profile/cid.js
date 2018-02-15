import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import CidForm from './cidForm'

import { DialogConfirmDelete } from './../../components/'
import { DialogAction } from './../../redux/actions/dialog'
import styles from '../../assets/style/themes/pages/profile.scss'

class ProfileCidPage extends Component {
  handleOpenDialog = (title, textBody, fn) => {
    this.props.openDialog(title, textBody, fn)
  }

  render() {
    const { firebase, uid, history } = { ...this.props }
    const updatePatientId = (data) => {
      var ref = firebase.database().ref()
      ref.child('users').orderByChild('patientId').equalTo(data.cid).once('value').then((snap) => {
        if (!snap.val()) {
          firebase.update(`/users/${uid}`, { patientId: data.cid })
            .then(() => {
              history.push('/main')
            })
        } else {
          this.handleOpenDialog('เตือน', 'เลขที่บัตรประชาชนนี้ ถูกใช้งานแล้ว', null)
        }
      })
    }
    const { displayName, avatarUrl } = { ...this.props }
    return (
      <div className={`containerMain ${styles.profilePage} ${styles.profileCidPage}`}>
        <div className={`card --avatarInfo`}>
          <div className={`avatarBlock --bigSize --center`}>
            <Avatar
              alt={displayName}
              backgroundColor={'#ffffff'}
              src={avatarUrl}
            />
          </div>
          <div className={`${styles.name}`}>
            {displayName}
          </div>
          <CidForm onSubmit={updatePatientId} />
        </div>
        <DialogConfirmDelete />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch, state) => {
  return {
    openDialog: (title, textBody, fn) => {
      dispatch(DialogAction.displayDialog(title, textBody, fn))
    }
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({
    uid: auth.uid,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl
  }), mapDispatchToProps)
)(ProfileCidPage)
