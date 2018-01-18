import { CHECKUP } from './../../constants/ActionTypes'

const checkup = {
  data: {},
  isLoaded: false
}
export default function CheckupReducer(state = checkup, action) {
  switch (action.type) {
    case CHECKUP.GETALL:
      return {
        ...state,
        data: action.payload,
        isLoaded: true
      }
    default:
      return state
  }
}
