import React, { Component } from 'react'
import ProfileEditForm from './editForm'
class ProfileEdit extends Component {
  state = {}
  render() {
    return (
      <div className='containerMain'>
        <div className='card'>
          <ProfileEditForm />
        </div>
      </div>
    )
  }
}

export default ProfileEdit