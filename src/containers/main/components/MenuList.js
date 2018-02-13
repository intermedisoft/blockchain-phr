import React, { Component } from 'react'
import { connect } from 'react-redux'

import NotificationUnread from './NotificationUnread'
import styles from '../../../assets/style/themes/pages/mainMenu.scss'

class MenuList extends Component {
  render() {
    const { history,
      permissionUnread,
      checkupHistoryUnread,
      xrayHistoryUnread,
      permissionUnreadloading,
      checkupHistoryUnreadloading,
      xrayHistoryUnreadloading,
      patientPermissionRequestList,
      handleClickLogout
    } = this.props

    return (
      <div className={`menuIconList ${styles.mainMenu}`}>
        <ul>
          <li onClick={() => history.push('/checkup')}>
            <div className={`iconCheckup`} />
            <div className={`text`}>Checkup</div>
            <div className={`noti`}>
              <NotificationUnread
                unRead={checkupHistoryUnread}
                loading={checkupHistoryUnreadloading}
              />
            </div>
          </li>
          <li onClick={() => history.push('/xray')}>
            <div className={`iconXray`} />
            <div className={`text`}>X-Ray</div>
            <div className={`noti`}>
              <NotificationUnread
                unRead={xrayHistoryUnread}
                loading={xrayHistoryUnreadloading}
              />
            </div>
          </li>
          <li onClick={() => history.push('/requestpermission')}>
            <div className={`iconPermission`} />
            <div className={`text`}>Request Permission</div>
            <div className={`noti`}>
              <NotificationUnread
                unRead={permissionUnread}
                loading={permissionUnreadloading}
              />
            </div>
          </li>
          {
            patientPermissionRequestList && patientPermissionRequestList.length
              ? <li onClick={() => history.push('/revokeprovider')}>
                <div className={`iconRevoke`} />
                <div className={`text`}>Revoke Provider</div>
              </li> : null
          }

          <li className={styles.logoutMenu} onClick={handleClickLogout}>
            <div className={`iconLogout`} />
            <div className={`text`}>Log out</div>
          </li>
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({
  permissionUnread: state.permission.unRead,
  permissionUnreadloading: state.permission.unReadLoding,
  checkupHistoryUnread: state.checkup.checkupHistory.unRead,
  checkupHistoryUnreadloading: state.checkup.checkupHistory.unReadLoding,
  xrayHistoryUnread: state.xray.xrayHistory.unRead,
  xrayHistoryUnreadloading: state.xray.xrayHistory.unReadLoding,
  patientPermissionRequestList: state.patient.data.authorizedHcpPermissionRequest
}))(MenuList)
