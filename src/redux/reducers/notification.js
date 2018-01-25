import { NOTIFICATION } from './../../constants/ActionTypes'

const notification = {
  data: {}
}
export default function NotificationReducer(state = notification, action) {
  switch (action.type) {
    case NOTIFICATION.GETSOCKET:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
