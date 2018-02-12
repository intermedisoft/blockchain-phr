import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import NotificationPage from './index'
import NotificationViewerPage from './view'

export default class RouteNotification extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/requestpermission' component={NotificationPage} />
        <Route path='/requestpermission/:id' component={NotificationViewerPage} />
      </Switch>
    )
  }
}
