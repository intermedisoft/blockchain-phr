import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from '../error.action'
import { _function } from '../../function'

const receivegetPatient = (data, unRead) => ({
  type: types.PERMISSION.GET,
  payload: data,
  unRead
})

const countUnread = (obj) => {
  const valible = 'patientAcknowledgeDateTime'
  let count = 0
  obj.forEach((key) => {
    !key[valible] && count++
  })
  return count
}
export const getPermission = (configs, patientId) => async (dispatch) => {
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
          i + 1 === data.length && dispatch(receivegetPatient(data, countUnread(data)))
          // })
        })
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const permissionAction = {
  getPermission
}
