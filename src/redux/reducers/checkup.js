import { CHECKUP } from './../../constants/ActionTypes'

const checkup = {
  data: {},
  isLoaded: false,
  checkupHistory: {
    data: [],
    unRead: 0,
    isLoaded: false
  },
  dataOnSelected: {
    data: {},
    isLoaded: false
  }
}
export default function CheckupReducer(state = checkup, action) {
  switch (action.type) {
    case CHECKUP.GETALL:
      return {
        ...state,
        data: action.payload,
        isLoaded: true
      }
    case CHECKUP.GET:
      return {
        ...state,
        dataOnSelected: {
          data: action.payload
        }
      }
    case CHECKUP.GETCHECKUPHISTORY:
      return {
        ...state,
        checkupHistory: {
          data: action.payload,
          unRead: action.unRead
        }
      }
    default:
      return state
  }
}
