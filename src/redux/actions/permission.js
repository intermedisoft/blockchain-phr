import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from '../error.action'
import { _function } from '../../function'

const receivegetPatient = (data, unRead) => ({
  type: types.PERMISSION.GET,
  payload: data,
  unRead
})

const receiveupdatePermission = (data) => ({
  type: types.PERMISSION.GETUPDATED,
  payload: data
})

const receiveupdatePermissionLoading = () => ({
  type: types.PERMISSION.GETUPDATEDLOADING
})

const receivesetDataOnReadingLoading = () => ({
  type: types.PERMISSION.SETDATAONREADINGLOADING
})

const receiveupdatePermissionClearData = () => ({
  type: types.PERMISSION.GETUPDATEDCLEAR
})

const receivegetPatientById = (data) => ({
  type: types.PERMISSION.GETSELECTED,
  payload: data
})

const receivesetDataOnReading = (id, reload) => ({
  type: types.PERMISSION.SETDATAONREADING,
  payload: id,
  reload
})
const receivegetPermissionResultProducedTransactionUnRead = (data) => ({
  type: types.PERMISSION.GETPERMISSIONTRANSACTIONUNREAD,
  payload: data
})
const getPermission = (patientId, reload) => async (dispatch) => {
  try {
    if (reload) {
      dispatch(receivesetDataOnReading(null, false))
    }
    dispatch(receivegetPermissionResultProducedTransactionUnRead(true))
    if (patientId) {
      const response = await Service.Permission.getPermission(patientId)
      if (!response.data.length) {
        dispatch(receivegetPatient({ nodata: true }))
      } else {
        let data = response.data
        data.forEach((key, i) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          key.patientId = _function.popHash(key.patient)
          i + 1 === data.length && dispatch(receivegetPatient(data.reverse(), _function.countUnread(data, 'patientAcknowledgeDateTime')))
        })
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const getPermissionById = (configs, permissionLogId) => async (dispatch) => {
  try {
    if (configs && permissionLogId) {
      const response = await Service.Permission.getPermissionById(configs, permissionLogId)
      response.data.healthCareProviderId = _function.popHash(response.data.healthCareProvider)
      response.data.patientId = _function.popHash(response.data.patient)
      dispatch(receivegetPatientById(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const updatePermission = (data) => async (dispatch) => {
  try {
    if (data) {
      dispatch(receiveupdatePermissionLoading())
      const response = await Service.Permission.updatePermission(data)
      dispatch(receiveupdatePermission(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const updatePermissionReading = (data, permissionLogId) => async (dispatch) => {
  try {
    if (data) {
      dispatch(receivesetDataOnReadingLoading())
      await Service.Permission.updatePermissionReading(data, permissionLogId)
      let reload = true
      dispatch(receivesetDataOnReading(permissionLogId, reload))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}
export const permissionAction = {
  getPermission,
  getPermissionById,
  updatePermission,
  updatePermissionReading,
  receiveupdatePermissionClearData,
  receivesetDataOnReading
}
