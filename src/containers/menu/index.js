import React, { Component } from 'react'

import logo from '../../assets/images/logo.svg'
import '../../assets/style/components/menuIconList.scss'
import styles from '../../assets/style/themes/pages/mainMenu.scss'

class MainmenuPage extends Component {
  render() {
    return (
      <section>
        <header className="headMain">
          <div className="contentHead">
            <div className="itemLeft">
              <button>xx</button>
            </div>
            <div className="itemCenter">
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
            </div>
            <div className="itemRight logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
        </header>
        <div className="containerMain">
          <div className={styles.profile}>
            <div className={`${styles.item} ${styles.image}`}>
            image
            </div>
            <div className={styles.item}>name</div>
            <div className={styles.item}>info</div>
          </div>
          <div className="menuIconList">
            <ul>
              <li className="--active">
                <div className="ico-wellness"></div>
                <div className="text">Wellness</div>
                <div className="noti"></div>
              </li>
              <li>
                <div className="ico-visit"></div>
                <div className="text">Visit</div>
                <div className="noti"></div>
              </li>
              <li>
                <div className="ico-checkup"></div>
                <div className="text">Checkup</div>
                <div className="noti"></div>
              </li>
              <li>
                <div className="ico-notification"></div>
                <div className="text">Notification</div>
                <div className="noti">
                  <span className="notiBlock">2</span>
                </div>
              </li>
              <li className={styles.logoutMenu}>
                <div className="ico-logout"></div>
                <div className="text">Log out</div>
                <div className="noti"></div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default MainmenuPage
