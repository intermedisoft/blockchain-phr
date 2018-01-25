import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'

import { _function } from './../../function'

const receivegetAllCheckup = (data) => ({
  type: types.CHECKUP.GETALL,
  payload: data
})

const getAllCheckup = (configs, patientId) => async (dispatch) => {
  try {
    if (configs && patientId) {
      const response = await Service.Checkup.getAllCheckup(configs, patientId)
      if (!response.data.length) {
        dispatch(receivegetAllCheckup({ nodata: true }))
      } else {
        let data = response.data
        data.forEach((key, i) => {
          // let healthCareProviderID = _function.popHash(key.healthCareProvider)
          // Service.HealthProvider.getHealthProvider(configs, healthCareProviderID).then((r) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          i + 1 === data.length && dispatch(receivegetAllCheckup(data))
          // })
        })
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const checkupAction = {
  getAllCheckup
}
