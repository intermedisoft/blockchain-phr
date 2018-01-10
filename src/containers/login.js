import React, { Component } from 'react'
import { FirebaseAuth } from 'react-firebaseui'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import { Button } from './../components'

import logo from '../assets/images/logo.svg'
import styles from '../assets/style/themes/pages/login.scss'

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCAxMoLvDZFjnQloua-aJf2hrJBHgHqvVs",
  authDomain: "blockchain-phr.firebaseapp.com",
  databaseURL: "https://blockchain-phr.firebaseio.com",
  projectId: "blockchain-phr",
  storageBucket: "blockchain-phr.appspot.com",
  messagingSenderId: "215396664903"
};

firebase.initializeApp(config)

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /mian after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/mian',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ]
// }

class Login extends Component {
  state = {
    signedIn: false // Local signed-in state.
  }

  // Configure FirebaseUI.
  uiConfig = {
    // // Popup signin flow rather than redirect flow.
    // signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    // Sets the `signedIn` state property to `true` once signed in.
    callbacks: {
      signInSuccess: (currentUser, credential, redirectUrl) => {
        this.setState({ signedIn: true });
        return false; // Avoid redirects after sign-in.
      }
    }
  }

  render() {
    if (!this.state.signedIn) {
      return (
        <section className={styles.container}>
          <div className={styles.loginGroup}>
          <div className={styles.logoSystem}>
          <img src={logo} alt="Logo"/>
          </div>
          {/* <p>Please sign-in:</p> */}
          <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </section>
      )
    }
    return <Redirect to="/main" />
  }
}

export default Login

