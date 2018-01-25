import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
// import PropTypes from 'prop-types'

import { authenAction } from './../../redux/actions/auth'
import ProfileComponent from './Profile'
import NotificationUnread from './components/NotificationUnread'
import styles from '../../assets/style/themes/pages/mainMenu.scss'

class MainmenuPage extends Component {
  RedirectToLogin = () => {
    this.props.authenActionLogout()
  }
  // componentDidMount() {

  // }

  render() {
    const { firebase, history } = { ...this.props }
    const logout = () => {
      firebase.logout().then(() => {
        this.RedirectToLogin()
      })
    }
    return (
      <section>
        <div className={`containerMain`}>
          <ProfileComponent />
          <div className={`menuIconList ${styles.mainMenu}`}>
            <ul>
              <li onClick={() => history.push('/checkup')}>
                <div className={`iconCheckup`}></div>
                <div className={`text`}>Checkup</div>
                <div className={`noti`}></div>
              </li>
              <li onClick={() => history.push('/notification')}>
                <div className={`iconNotification`}></div>
                <div className={`text`}>Notification</div>
                <div className={`noti`}>
                  <NotificationUnread />
                </div>
              </li>
              <li className={styles.logoutMenu} onClick={logout}>
                <div className={`iconLogout`}></div>
                <div className={`text`}>Log out</div>
                <div className={`noti`}></div>
              </li>
            </ul>
          </div>
          {/* <div>
            {
              isLoaded(profile)
                ? JSON.stringify(profile, null, 2)
                : 'Loading...'
            }
          </div> */}
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    authenActionLogout: () => {
      dispatch(authenAction.logout())
    }
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({}), mapDispatchToProps)
)(MainmenuPage)
