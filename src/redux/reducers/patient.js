import { PATIENT } from './../../constants/ActionTypes'

const patientUser = {
  data: {},
  isLoading: false
}
export default function PatientReducer (state = patientUser, action) {
  switch (action.type) {
    case PATIENT.GET:
      return {
        ...state,
        data: action.payload,
        isLoading: true
      }
    default:
      return state
  }
}
