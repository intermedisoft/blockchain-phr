import * as types from './../../constants/ActionTypes'

const header = {
  text: ''
}
export default function HeaderReducer(state = header, action) {
  switch (action.type) {
    case types.HEADER.SET:
      return {
        text: action.text
      }
    default:
      return state
  }
}
