import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'
const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log(rest)
  return (<Route {...rest} render={props => {
    return (
      (
        <Component {...props} />
      )
    )
  }} />
  )
}
export default PrivateRoute
