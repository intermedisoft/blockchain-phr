import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Template from './../template'
import Login from './../containers/login'
// import PrivateRoute from './../routes/PrivateRoute'

export default class RouteRoot extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' name='Login Page' component={Login} />
          <Route path='/' name='Home' component={Template} />
        </Switch>
      </Router>
    )
  }
}
