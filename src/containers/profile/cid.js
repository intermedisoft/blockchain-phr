import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import CidForm from './cidForm'

const avatarstyles = {
  bigAvatar: {
    width: 120,
    height: 120
  },
  center: {
    textAlign: 'center'
  }
}

class ProfileCidPage extends Component {
  render () {
    const { firebase, uid, history } = { ...this.props }
    const updatePatientId = (data) => {
      firebase.update(`/users/${uid}`, { patientId: data.cid })
        .then(() => {
          history.push('/main')
        })
    }
    const { displayName, avatarUrl } = { ...this.props }
    return (
      <div className='containerMain' >
        <div className='menuIconList'>
          <div>
            <Avatar
              alt={displayName}
              src={avatarUrl}
              style={avatarstyles.bigAvatar}
            />
          </div>
          <div>
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
