// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
// import { compose, lifecycle } from 'recompose'
// const _userLogin = localStorage.getItem('_userLogin') || false
// const uid = _userLogin ? JSON.parse(_userLogin).user.replace(/["]/gi, '') : ''

// class CheckUser extends Component {

//   // componentWillUpdate () {
//   //   const { users } = { ...this.props }
//   //   console.log(users)
//   // }

//   render() {
//     const { users } = { ...this.props }
//     console.log(users)
//     return (
//       <div>
//         {
//           (isLoaded(users)) && (!isEmpty(users))
//             ? this.props.history.push('/main/')
//             : 'xxxx'
//         }
//       </div>
//     )
//     // if (!isEmpty(users)) {
//     //   return (
//     //     <Redirect to='/main' />
//     //   )
//     // } else {
//     //   return (
//     //     <Redirect to='/profile' />
//     //   )
//     //   // window.location.reload()
//     // }
//   }
// }

// // const CheckUser = (props) => {
// //   const { users } = { ...props }
// //   if (!isEmpty(users)) {
// //     console.log(users)
// //     //   if (props.users[uid].patientId) {
// //     //     props.history.push('/main')
// //     //   } else {
// //     //     props.history.push('/profile/cid')
// //     //   }
// //     // } else {
// //     //   // props.history.push('/login')
// //   }
// //   return null
// // }

// // CheckUser.propTypes = {
// //   users: PropTypes.object
// // }
// const enhance = compose(
//   firebaseConnect(() => [
//     {
//       path: `users/${uid}`
//     }
//   ]),
//   connect((state) => ({
//     users: state.firebase.data.users
//   }))
// )

// export default enhance(CheckUser)
