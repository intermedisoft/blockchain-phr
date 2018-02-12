import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase } from 'react-redux-firebase'
// import PropTypes from 'prop-types'

import { authenAction } from './../../redux/actions/auth'
import ProfileComponent from './Profile'
// import MenuList from './components/MenuList'
// import NotificationUnread from './../../components/NotificationUnread'
// import styles from '../../assets/style/themes/pages/mainMenu.scss'
import MenuList from './components/MenuList'

class MainmenuPage extends Component {
  RedirectToLogin = () => {
    this.props.authenActionLogout()
  }

  render() {
    const { firebase, history } = { ...this.props }
    const handleClickLogout = () => {
      firebase.logout().then(() => {
        this.RedirectToLogin()
      })
    }
    return (
      <section>
        <div className={`containerMain`}>
          <ProfileComponent />
          <MenuList history={history} handleClickLogout={handleClickLogout} />
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
  // connect((firebase) => ({})), mapDispatchToProps
  connect(({ firebase }) => ({}), mapDispatchToProps)
)(MainmenuPage)
