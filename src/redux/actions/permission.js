import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from '../error.action'

const receivegetPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})

export const getPermission = (configs, patientId) => async (dispatch) => {
  console.log('**********************************')
  try {
    if (configs && patientId) {
      console.log(configs, patientId)
      // const response = await Service.Patient.getPatient(configs, patientId)
      // dispatch(receivegetPatient(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const permissionAction = {
  getPermission
}
