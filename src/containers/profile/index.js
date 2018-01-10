import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'

class ProfilePage extends Component {
  render() {
    const { firebase } = { ...this.props }
    console.log(this.props)
    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {this.props.configs}
        </ul>
        {/* <button onClick={() => firebase.watchEvent('value', 'configs')}>
          Load Config
      </button> */}
      </div>
    )
  }
}

export default compose(
  firebaseConnect(props => [
    { path: 'configs' }
  ]),
  connect(
    (state) => ({
      // configs: state.firebase.data.configs,
      profile: state.firebase.profile // load profile
    })
  )
)(ProfilePage)
