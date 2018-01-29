import { XRAY } from './../../constants/ActionTypes'

const xray = {
  data: {},
  isLoaded: false
}
export default function XrayReducer(state = xray, action) {
  switch (action.type) {
    case XRAY.GET:
      return {
        ...state,
        data: action.payload,
        isLoaded: false
      }
    default:
      return state
  }
}
