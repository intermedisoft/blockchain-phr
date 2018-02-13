import * as types from './../../constants/ActionTypes'
import { ActionErrHandle } from '../error.action'

import { Service } from './../../service'

// import { permissionAction } from './permission'
// import { patientAction } from './patient'

const receiveupdateRevokeProvider = (isLoading, isDone) => ({
  type: types.REVOKEPROVIDER.UPDATE,
  isLoading,
  isDone
})
const receivegetPatient = (data) => ({
  type: types.PATIENT.GET,
  payload: data
})
const updateRevokeProvider = (data, patientId) => async (dispatch) => {
  try {
    if (data) {
      dispatch(receiveupdateRevokeProvider(true, false))
      await Service.Permission.updatePermission(data)
      const response = await Service.Patient.getPatient(patientId)
      dispatch(receivegetPatient(response.data))
      dispatch(receiveupdateRevokeProvider(false, true))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}
export const revokeProviderAction = {
  updateRevokeProvider
}
