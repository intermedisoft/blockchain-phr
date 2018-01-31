import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'
import { _function } from './../../function'

const receivegetAllXray = (data) => ({
  type: types.XRAY.GET,
  payload: data
})

const getAllXray = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      const response = await Service.Xray.getXray(patientId)
      if (!response.data.length) {
        dispatch(receivegetAllXray({ nodata: true }))
      } else {
        let data = response.data
        data.forEach((key, i) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          i + 1 === data.length && dispatch(receivegetAllXray(data))
        })
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const xrayAction = {
  getAllXray
}
