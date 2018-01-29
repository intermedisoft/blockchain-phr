import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Detail from './../containers/detail'
import Mainmenu from './../containers/main'
import RouteCheckup from './../containers/checkup/Route'
import RouteProfile from './../containers/profile/Route'
import RouteNotification from './../containers/notification/Route'
import RouteXray from './../containers/xray/Route'
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
        <Route path='/checkup/:id?' component={RouteCheckup} />
        <Route path='/profile/:id?' component={RouteProfile} />
        <Route path='/xray/:id?' component={RouteXray} />
        <Route path='/notification/:id?' component={RouteNotification} />
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
