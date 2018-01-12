import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Detail from './../containers/detail'
import Mainmenu from './../containers/main'
import Notification from './../containers/notification'
import RouteProfile from './../containers/profile/Route'
// import checkUser from './../containers/chkUser'
// import User from './../containers/user'
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
  render() {
    return (
      <Switch>
        <Route exact name='MAIN_NAME' path='/main' component={Mainmenu} />} />
        <Route path='/notification' component={Notification} />
        <Route path='/profile/:id?' component={RouteProfile} />
        <Route path='/detail' component={Detail} />
        {/* <Route exact path='/user' component={User} /> */}

        {/* <AdminRoute path='/friends/:id?' role={'admin'} component={RouteFriends} /> */}
        {/* <AdminRoute path='/users/:id?' role={'admin'} component={RouteUsers} /> */}
        <Redirect from='/' to='/main' />
      </Switch>
    )
  }
}

export default RouteMenu
