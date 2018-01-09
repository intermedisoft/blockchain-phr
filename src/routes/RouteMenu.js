import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Detail from './../containers/detail'
import Mainmenu from './../containers/menu'
import Notification from './../containers/notification'
import Profile from './../containers/profile'
// import RouteFriends from './../containers/friends/Route'
// import RouteUsers from './../containers/users/Route'

// const AdminRoute = ({ component: Component, ...rest, role }) => {
//   return (<Route {...rest} render={props => (
//     role === 'admin' ? (
//       <Component {...props} />
//     ) : (<Redirect to={{
//       pathname: '/',
//       state: { from: props.location }
//     }} />
//       )
//   )} />
//   )
// }

class RouteMenu extends Component {
  render () {
    return (
      <Switch>
        <Route path='/main' component={Mainmenu} />
        <Route path='/notification' component={Notification} />
        <Route path='/profile' component={Profile} />
        <Route path='/detail' component={Detail} />
        {/* <AdminRoute path='/friends/:id?' role={'admin'} component={RouteFriends} /> */}
        {/* <AdminRoute path='/users/:id?' role={'admin'} component={RouteUsers} /> */}
        <Redirect from='/' to='/main' />
      </Switch>
    )
  }
}

export default RouteMenu
