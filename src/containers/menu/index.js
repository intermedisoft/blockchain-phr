import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import '../../assets/style/components/menuIconList.scss'
import styles from '../../assets/style/themes/pages/mainMenu.scss'
import logo from '../../assets/images/logo.svg'
import userImage from '../../assets/images/user.jpg'

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
      <section>
        <header className={`headMain`}>
          <div className={`contentHead`}>
            <div className={`itemLeft`}>
              <button>xx</button>
            </div>
            <div className={`itemCenter`}>
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
            </div>
            <div className={`itemRight logo`}>
              <img src={logo} alt='Logo' />
            </div>
          </div>
        </header>
        <div className={`containerMain`}>
          <div className={styles.profile}>
            <div className={`${styles.item} ${styles.image}`}>
              <div className={styles.userImage}>
                <img src={userImage} alt='Logo' />
              </div>
            </div>
            <div className={`${styles.item} ${styles.profileName}`}>
              <span className={styles.nameLabel}> Hi <label>PREECHAWUT NOOSAWAT</label></span>
              <span className={styles.nameMore}></span>
            </div>
            <div className={`${styles.item} ${styles.profileInfo}`}>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>00/00/00</div>
                <div className={styles.labelInfo}>Birthday</div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>123</div>
                <div className={styles.labelInfo}>Weight</div>
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.valueInfo}>123</div>
                <div className={styles.labelInfo}>Height</div>
              </div>
              <div className={styles.itemInfo}>blood</div>
              <div className={styles.itemInfo}>sex</div>
            </div>
          </div>
          <div className={`menuIconList ${styles.mainMenu}`}>
            <ul>
              <li className={`--active`}>
                <div className={`ico-wellness`}></div>
                <div className={`text`}>Wellness</div>
                <div className={`noti`}></div>
              </li>
              <li>
                <div className={`ico-visit`}></div>
                <div className={`text`}>Visit</div>
                <div className={`noti`}></div>
              </li>
              <li>
                <div className={`ico-checkup`}></div>
                <div className={`text`}>Checkup</div>
                <div className={`noti`}></div>
              </li>
              <li>
                <div className={`ico-notification`}></div>
                <div className={`text`}>Notification</div>
                <div className={`noti`}>
                  <span className={`notiBlock`}>2</span>
                </div>
              </li>
              <li className={styles.logoutMenu} onClick={logout}>
                <div className={`ico-logout`}></div>
                <div className={`text`}>Log out</div>
                <div className={`noti`}></div>
              </li>
            </ul>
          </div>
          <div>
            {
              isLoaded(profile)
                ? JSON.stringify(profile, null, 2)
                : 'Loading...'
            }
          </div>
        </div>
      </section>
    )
  }
}
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
