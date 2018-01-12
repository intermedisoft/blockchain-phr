import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import ProfilePage from './index'
import ProfileCidPage from './cid'
import ProfileEdit from './edit'

export default class RouteUser extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/profile' component={ProfilePage} />
        <Route path='/profile/cid' component={ProfileCidPage} />
        <Route path='/profile/edit' component={ProfileEdit} />
      </Switch>
    )
  }
}
