import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
// import { compose } from 'redux'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loadable from 'react-loading-overlay'

import { authenAction } from './../redux/actions/auth'

import logo from '../assets/images/logo.svg'
import iconGoogle from '../assets/images/google.svg'
import iconTwitter from '../assets/images/twitter.svg'
import iconFacebook from '../assets/images/facebook.svg'
import styles from '../assets/style/themes/pages/login.scss'

class LoginPage extends Component {
  render() {
    const { firebase, auth, history, authenAction } = { ...this.props }
    // console.log(firebase)
    if (!isLoaded(auth)) {
      return (
        <Loadable active spinner className={`loading`} text='Loading...' />
      )
    }
    const handleLogin = (provider) => {
      firebase.login({ provider: provider, type: 'redirect' }).catch(err => console.log(err))
    }

    if (isEmpty(auth)) {
      return (
        <section className={styles.container}>
          <div className={styles.loginGroup}>
            <div className={styles.logoSystem}>
              <img src={logo} alt='Logo' />
            </div>
            <div className={styles.loginButtonGroup}>
              <button className={`${styles.btnLogin} ${styles.google}`} onClick={() => handleLogin('google')}>
                <span className={styles.icon}>
                  <img src={iconGoogle} alt='Sign in with Google' />
                </span>
                <span className={styles.text}>Sign in with Google</span>
              </button>
              <button className={`${styles.btnLogin} ${styles.facebook}`} onClick={() => handleLogin('facebook')}>
                <span className={styles.icon}>
                  <img src={iconFacebook} alt='Sign in with Facebook' />
                </span>
                <span className={styles.text}>Sign in with Facebook</span>
              </button>
              <button className={`${styles.btnLogin} ${styles.twitter}`} onClick={() => handleLogin('twitter')}>
                <span className={styles.icon}>
                  <img src={iconTwitter} alt='Sign in with Twitter' />
                </span>
                <span className={styles.text}>Sign in with Twitter</span>
              </button>
            </div>
          </div>
        </section>
      )
    } else {
      firebase.database().ref(`users/${auth.uid}`).once('value').then(function (users) {
        authenAction(auth.uid)
        const user = users.val()
        user && user.patientId ? history.push('/main') : history.push('/profile/cid')
      })
      return (
        <Loadable active spinner text='Loading...' className={`loading`} />
      )
    }
  }
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    authenAction: (uid) => {
      dispatch(authenAction.saveUser(uid))
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.firebase.auth
  }
)

export default compose(
  firebaseConnect(),
  // lifecycle({
  //   componentWillUnmount () {
  //     this.props.firebase.watchEvent('value', 'configs')
  //   }
  // }),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage)
