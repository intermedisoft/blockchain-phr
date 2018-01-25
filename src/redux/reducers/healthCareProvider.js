import { HEALTHCARE } from './../../constants/ActionTypes'

const HealthCareProvider = {
  data: {},
  isLoading: false
}
export default function HealthCareProviderReducer(state = HealthCareProvider, action) {
  switch (action.type) {
    case HEALTHCARE.GET:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
