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

const receivesetDataOnReading = (id) => ({
  type: types.PERMISSION.SETDATAONREADING,
  payload: id
})

const countUnread = (obj) => {
  const valible = 'patientAcknowledgeDateTime'
  let count = 0
  obj.forEach((key) => {
    !key[valible] && count++
  })
  return count
}

const getPermission = (configs, patientId) => async (dispatch) => {
  try {
    if (configs && patientId) {
      const response = await Service.Permission.getPermission(configs, patientId)
      if (!response.data.length) {
        dispatch(receivegetPatient({ nodata: true }))
      } else {
        let data = response.data
        data.forEach((key, i) => {
          // let healthCareProviderID = _function.popHash(key.healthCareProvider)
          // Service.HealthProvider.getHealthProvider(configs, healthCareProviderID).then((r) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          key.patientId = _function.popHash(key.patient)
          i + 1 === data.length && dispatch(receivegetPatient(data.reverse(), countUnread(data)))
          // })
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

const updatePermission = (configs, data) => async (dispatch) => {
  try {
    if (configs && data) {
      dispatch(receiveupdatePermissionLoading())
      const response = await Service.Permission.updatePermission(configs, data)
      dispatch(receiveupdatePermission(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const updatePermissionReading = (configs, data, permissionLogId) => async (dispatch) => {
  try {
    if (configs && data) {
      dispatch(receivesetDataOnReadingLoading())
      await Service.Permission.updatePermissionReading(configs, data, permissionLogId)
      dispatch(receivesetDataOnReading(permissionLogId))
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
