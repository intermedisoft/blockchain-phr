import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'

const receivegetPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})

export const getPatient = () => async (dispatch) => {
  try {
    const response = await Service.Patient.getPatient()
    dispatch(receivegetPatient(response.data))
  } catch (error) {
    console.log(error)
  }
}

// const getPatient = () => dispatch => {
//   dispatch(receivegetPatient())
// }
export const patientAction = {
  getPatient
}
