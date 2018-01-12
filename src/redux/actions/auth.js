import * as types from './../../constants/ActionTypes'

const receivegetUser = () => ({
  type: types.AUTHEN.GET
})

const receiveLogout = () => {
  return {
    type: types.AUTHEN.LOGOUT,
    data: ''
  }
}

const receivesaveUser = (uid) => ({
  type: types.AUTHEN.SAVE_DATA,
  data: uid
})

const getUser = () => dispatch => {
  dispatch(receivegetUser())
}

const logout = () => dispatch => {
  dispatch(receiveLogout())
}

const saveUser = (uid) => dispatch => {
  dispatch(receivesaveUser(uid))
}

export const authenAction = {
  getUser,
  logout,
  saveUser
}
