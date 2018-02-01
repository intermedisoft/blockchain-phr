import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'

import { _function } from './../../function'

const receivegetAllCheckup = (data) => ({
  type: types.CHECKUP.GETALL,
  payload: data
})

const receivegetCheckup = (data) => ({
  type: types.CHECKUP.GET,
  payload: data
})

const receivegetCheckupResultProducedTransaction = (data, unRead) => ({
  type: types.CHECKUP.GETCHECKUPHISTORY,
  payload: data,
  unRead
})

const getAllCheckup = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      const response = await Service.Checkup.getAllCheckup(patientId)
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

const getCheckup = (assetId) => async (dispatch) => {
  try {
    if (assetId) {
      const response = await Service.Checkup.getCheckup(assetId)
      const data = response.data
      data.healthCareProviderId = _function.popHash(data.healthCareProvider)
      dispatch(receivegetCheckup(data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const getCheckupResultProducedTransaction = (configs) => async (dispatch) => {
  try {
    if (configs) {
      const response = await Service.Checkup.getCheckupResultProducedTransaction(configs)
      let data = response.data
      data.forEach((key, i) => {
        key.checkupHistory.healthCareProviderId = _function.popHash(key.checkupHistory.healthCareProvider)
        i + 1 === data.length && dispatch(receivegetCheckupResultProducedTransaction(data, _function.countUnread(data, 'patientAcknowledgeDateTime')))
      })
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}
export const checkupAction = {
  getAllCheckup,
  getCheckup,
  getCheckupResultProducedTransaction
}
