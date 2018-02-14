import * as types from './../../constants/ActionTypes'

const modal = {
  modalOpen: false,
  header: '',
  code: '',
  message: ''
}
export default function FetchErrorReducer(state = modal, action) {
  switch (action.type) {
    case types.ERROR_MESSAGE.CODE500:
      return {
        modalOpen: true,
        header: 'internal-server-error',
        code: action.type,
        message: action.message
      }
    case types.ERROR_MESSAGE.CODE404:
      return {
        modalOpen: true,
        header: 'not-found',
        code: action.type,
        message: action.message
      }
    case types.ERROR_MESSAGE.NETWORKERROR:
      return {
        modalOpen: true,
        header: 'Network Error',
        code: action.type,
        message: action.message
      }
    case types.ERROR_MESSAGE.CLEAR:
      return {
        ...state,
        modalOpen: false
      }
    case types.ERROR_MESSAGE.ERR:
      return {
        modalOpen: true,
        header: '',
        code: action.type,
        message: action.message
      }
    default:
      return state
  }
}
