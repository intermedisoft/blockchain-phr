import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import XrayPage from './index'
import XrayViewerPage from './view'

export default class RouteCheckup extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/xray' component={XrayPage} />
        <Route path='/xray/:id' component={XrayViewerPage} />
      </Switch>
    )
  }
}
