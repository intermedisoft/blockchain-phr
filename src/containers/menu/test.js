import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class MainmenuPage extends Component {
  RedirectToLogin = () => {
    if (isEmpty(this.props.auth)) {
      this.props.history.push('login')
    }
  }
  componentDidMount() {
    this.RedirectToLogin()
  }
  render() {
    const { profile, firebase } = { ...this.props }
    const handleAdd = () => {
      return firebase.update(`/users/D2eQ26j2erRMWXxKtAQFMA9jcZM2`, { text: 12343, done: false })
        .then((r) => {
          console.log(r)
        })
    }
    const logout = () => {
      firebase.logout().then(() => {
        this.RedirectToLogin()
      })
    }
    return (
      <div>
        <h2>Update User Profile</h2>
        <button onClick={logout}>
          Logout
      </button>
        <button onClick={handleAdd}>
          Test Push
        </button>
        <div>
          {
            isLoaded(profile)
              ? JSON.stringify(profile, null, 2)
              : 'Loading...'
          }
        </div>
      </div>
    )
  }
}

// const MainmenuPage = ({ profile, firebase }) => {
//   console.log(firebase)
// const handleAdd = () => {
//   return firebase.update(`/users/D2eQ26j2erRMWXxKtAQFMA9jcZM2`, { text: 1234, done: false })
//     .then((r) => {
//       console.log(r)
//     })
// }
// const logout = () => {
//   firebase.logout()
//   return (
//     isEmpty(profile) && <Redirect to='/main' />
//   )
// }
//   return (
//     <div>
//       <h2>Update User Profile</h2>

//       <button onClick={logout}>
//         Logout
//     </button>

//       <button onClick={handleAdd}>
//         Test Push
//   </button>
//       <div>
//         {
//           isLoaded(profile)
//             ? JSON.stringify(profile, null, 2)
//             : 'Loading...'
//         }
//       </div>
//     </div>
//   )
// }

MainmenuPage.propTypes = {
  profile: PropTypes.object
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile,
    avatarUrl: profile.avatarUrl
  }))
)(MainmenuPage)

// const mapStateToProps = state => (
//   {
//     profile: state.firebase
//   }
// )

// export default connect(mapStateToProps)(MainmenuPage)
