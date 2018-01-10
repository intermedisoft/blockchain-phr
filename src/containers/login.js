import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loadable from 'react-loading-overlay'
import logo from '../assets/images/logo.svg'
import styles from '../assets/style/themes/pages/login.scss'

const LoginPage = ({ firebase, auth }) => {
  if (!isLoaded(auth)) {
    return (
      <Loadable active spinner text='Loading...' />
    )
  }
  const handleLogin = (provider) => {
    firebase.login({ provider: provider, type: 'redirect' }).catch(err => console.log(err))
  }

  return (
    isEmpty(auth) ? <div>
      <div className={styles.logo_sys}>
        <img src={logo} alt='Logo' />
      </div>
      <button onClick={() => handleLogin('google')}>Login With Google</button>
      <button onClick={() => handleLogin('facebook')}>Login With Facebook</button>
      <button onClick={() => handleLogin('twitter')}>Login With Twitter</button>

    </div> : <Redirect to='/main' />
  )
}

LoginPage.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

const mapStateToProps = state => (
  {
    auth: state.firebase.auth
  }
)

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(LoginPage)
