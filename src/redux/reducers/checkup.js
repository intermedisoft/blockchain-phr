import { CHECKUP } from './../../constants/ActionTypes'

const checkup = {
  data: {},
  isLoaded: false,
  checkupHistory: {
    data: [],
    unRead: 0,
    unReadLoding: false,
    isLoaded: false,
    updateReading: false
  },
  dataOnSelected: {
    data: {},
    isLoaded: false
  }
}
export default function CheckupReducer(state = checkup, action) {
  const chkup = state.checkupHistory
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
          ...chkup,
          data: action.payload,
          unRead: action.unRead,
          unReadLoding: false
        }
      }
    case CHECKUP.GETCHECKUPHISTORYUNREAD:
      return {
        ...state,
        checkupHistory: {
          ...chkup,
          unReadLoding: action.payload
        }
      }
    case CHECKUP.UPDATEREADINGCHECKUPHISTORY:
      return {
        ...state,
        checkupHistory: {
          ...chkup,
          updateReading: action.payload
        }
      }
    default:
      return state
  }
}
