import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log('0000')
  // console.log(rest)
  // console.log('0000')
  return (<Route {...rest} render={props => {
    // console.log(props)
    const login = rest.authen.isLogin
    // console.log('asdas')
    // console.log(login)
    return (
      login ? (
        <Component {...props} />
      ) : (<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
        )
    )
  }} />
  )
}

const mapStateToProps = state => (
  { authen: state.auth }
)

export default connect(mapStateToProps)(PrivateRoute)
