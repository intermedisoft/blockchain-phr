import * as types from './../../constants/ActionTypes'

const revokeprovider = {
  isLoading: false,
  isDone: false
}
export default function RevokeProviderReducer(state = revokeprovider, action) {
  switch (action.type) {
    case types.REVOKEPROVIDER.UPDATE:
      return {
        isLoading: action.isLoading,
        isDone: action.isDone
      }
    default:
      return state
  }
}
