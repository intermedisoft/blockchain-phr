import { AUTHEN } from './../../constants/ActionTypes'

const authenUser = {
  user: {},
  isLogin: false
}
export default function AuthenReducer (state = authenUser, action) {
  switch (action.type) {
    case AUTHEN.GET:
      return {
        ...state,
        isLogin: true
      }
    case AUTHEN.SAVE_DATA:
      return {
        ...state,
        user: action.data,
        isLogin: true
      }
    case AUTHEN.LOGOUT:
      return {
        ...state,
        user: {},
        isLogin: false
      }
    default:
      return state
  }
}
