import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import CidForm from './cidForm'

import styles from '../../assets/style/themes/pages/cid.scss'

class ProfileCidPage extends Component {
  render() {
    const { firebase, uid, history } = { ...this.props }
    const updatePatientId = (data) => {
      firebase.update(`/users/${uid}`, { patientId: data.cid })
        .then(() => {
          history.push('/main')
        })
    }
    const { displayName, avatarUrl } = { ...this.props }
    return (
      <div className={`containerMain ${styles.cidPage}`}>
        <div className='card'>
          <div>
            <Avatar
              alt={displayName}
              src={avatarUrl}
              className='bigSize center'
            />
          </div>
          <div className={`${styles.name}`}>
            {displayName}
          </div>
          <CidForm onSubmit={updatePatientId} />
        </div>
      </div>
    )
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({
    uid: auth.uid,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl
  }))
)(ProfileCidPage)
