import { CHECKUP } from './../../constants/ActionTypes'

const checkup = {
  data: {},
  isLoading: false
}
export default function CheckupReducer (state = checkup, action) {
  switch (action.type) {
    case CHECKUP.GETALL:
      return {
        ...state,
        data: action.payload,
        isLoading: true
      }
    default:
      return state
  }
}
