import React, { Component } from 'react'
import ListComponent from './components/list'

class NotificationPage extends Component {
  render() {
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <ListComponent />
        </div>
      </div>
    )
  }
}

export default NotificationPage
