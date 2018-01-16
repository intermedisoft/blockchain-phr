import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import CheckupPage from './index'
import CheckupViewerPage from './view'

export default class RouteCheckup extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/checkup' component={CheckupPage} />
        <Route path='/checkup/:id' component={CheckupViewerPage} />
      </Switch>
    )
  }
}
