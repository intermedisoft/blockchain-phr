import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'

const receivegetPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})

// const receivegetPatient1 = (data) => {
//   // console.log(data)
//   return ({
//     type: types.PATIENT.GET,
//     payload: data
//   })
// }
export const getPatient = (configs, patientId) => async (dispatch) => {
  try {
    if (configs && patientId) {
      const response = await Service.Patient.getPatient(configs, patientId)
      dispatch(receivegetPatient(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

// const getPatient = () => dispatch => {
//   dispatch(receivegetPatient())
// }
export const patientAction = {
  getPatient
}
