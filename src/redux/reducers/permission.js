import { PERMISSION } from './../../constants/ActionTypes'

const permission = {
  data: {},
  unRead: 0,
  isLoading: false
}
export default function PermissionReducer(state = permission, action) {
  switch (action.type) {
    case PERMISSION.GET:
      return {
        ...state,
        data: action.payload,
        unRead: action.unRead,
        isLoading: false
      }
    case PERMISSION.LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}
