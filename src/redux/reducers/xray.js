import { XRAY } from './../../constants/ActionTypes'

const xray = {
  data: {},
  isLoaded: false,
  xrayHistory: {
    data: [],
    unRead: 0,
    unReadLoding: false,
    isLoaded: false,
    updateReading: false
  }
}
export default function XrayReducer(state = xray, action) {
  const xrhis = state.xrayHistory
  switch (action.type) {
    case XRAY.GET:
      return {
        ...state,
        data: action.payload,
        isLoaded: false
      }
    case XRAY.GETXRAYTRANSACTION:
      return {
        ...state,
        xrayHistory: {
          ...xrhis,
          data: action.payload,
          unRead: action.unRead,
          unReadLoding: false
        }
      }
    case XRAY.GETXRAYTRANSACTIONUNREAD:
      return {
        ...state,
        xrayHistory: {
          ...xrhis,
          unReadLoding: action.payload
        }
      }
    case XRAY.GETXRAYTRANSACTIONUNREADONLY:
      return {
        ...state,
        xrayHistory: {
          ...xrhis,
          unRead: action.payload
        }
      }
    default:
      return state
  }
}
