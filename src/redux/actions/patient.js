import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'

const receivegetPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})

const receiveEditPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})

const receiveIsLoadingPatient = () => ({
  type: types.PATIENT.ISLOADING
})

const receiveIsLoadedPatient = () => ({
  type: types.PATIENT.ISLOADED
})

// const receivegetPatient1 = (data) => {
//   // console.log(data)
//   return ({
//     type: types.PATIENT.GET,
//     payload: data
//   })
// }
export const getPatient = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      const response = await Service.Patient.getPatient(patientId)
      dispatch(receivegetPatient(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const editPatient = (patientId, data) => async (dispatch) => {
  try {
    if (patientId) {
      dispatch(receiveIsLoadingPatient())
      const response = await Service.Patient.editPatient(patientId, data)
      response.data.save = true
      dispatch(receiveIsLoadedPatient())
      dispatch(receiveEditPatient(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const patientAction = {
  getPatient,
  editPatient
}
