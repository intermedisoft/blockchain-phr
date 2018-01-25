import { PERMISSION } from './../../constants/ActionTypes'

const permission = {
  data: {},
  isLoading: false
}
export default function PermissionReducer(state = permission, action) {
  switch (action.type) {
    case PERMISSION.GET:
      return {
        ...state,
        data: action.payload,
        isLoading: true
      }
    default:
      return state
  }
}
