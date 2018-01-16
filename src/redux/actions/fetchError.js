import * as types from './../../constants/ActionTypes'

const code500 = message => ({
  type: types.ERROR_MESSAGE.CODE500,
  message
})

const code404 = message => ({
  type: types.ERROR_MESSAGE.CODE404,
  message
})

const clearAlert = message => ({
  type: types.ERROR_MESSAGE.CLEAR
})

export const alertAction = {
  code500,
  code404,
  clearAlert
}
