import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import RevokeProviderPage from './index'
import RevokeViewerPage from './view'

export default class RouteRevokeProvider extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/revokeprovider' component={RevokeProviderPage} />
        <Route path='/revokeprovider/:id' component={RevokeViewerPage} />
      </Switch>
    )
  }
}
