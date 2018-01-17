import * as types from './../../constants/ActionTypes'

const setHeader = text => ({
  type: types.HEADER.SET,
  text
})

export const HeaderAction = {
  setHeader
}
