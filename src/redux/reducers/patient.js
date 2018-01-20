import { PATIENT } from './../../constants/ActionTypes'

const patientUser = {
  data: {},
  isLoading: false,
  isLoaded: true
}
export default function PatientReducer(state = patientUser, action) {
  switch (action.type) {
    case PATIENT.GET:
      return {
        ...state,
        data: action.payload,
        isLoading: true
      }
    case PATIENT.ISLOADING:
      return {
        ...state,
        isLoaded: false
      }
    case PATIENT.ISLOADED:
      return {
        ...state,
        isLoaded: true
      }
    case PATIENT.EDIT:
      return {
        ...state,
        data: action.payload,
        isLoaded: true
      }
    default:
      return state
  }
}
