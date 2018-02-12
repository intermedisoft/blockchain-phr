import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'
import moment from 'moment'

import { _function } from './../../function'

const receivegetAllCheckup = (data) => ({
  type: types.CHECKUP.GETALL,
  payload: data
})

const receivegetCheckup = (data) => ({
  type: types.CHECKUP.GET,
  payload: data
})

const receiveupdateReadCheckupHistory = (action) => ({
  type: types.CHECKUP.UPDATEREADINGCHECKUPHISTORY,
  payload: action
})

const receivegetCheckupResultProducedTransaction = (data, unRead) => ({
  type: types.CHECKUP.GETCHECKUPHISTORY,
  payload: data,
  unRead
})

const receivegetCheckupResultProducedTransactionUnRead = (data) => ({
  type: types.CHECKUP.GETCHECKUPHISTORYUNREAD,
  payload: data
})

const receivegetCheckupResultProducedTransactionSetUnReadOnly = (unread) => ({
  type: types.CHECKUP.GETCHECKUPHISTORYUNSETREADONLY,
  payload: unread
})

const getAllCheckup = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      const response = await Service.Checkup.getAllCheckup(patientId)
      if (!response.data.length) {
        dispatch(receivegetAllCheckup({ nodata: true }))
      } else {
        let data = response.data
        let countUnread = data.length
        data.forEach((key, i) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          key.patientAcknowledgeDateTime && countUnread--
          if (i + 1 === data.length) {
            dispatch(receivegetAllCheckup(data))
            dispatch(receivegetCheckupResultProducedTransactionSetUnReadOnly(countUnread))
          }
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

const updateReadCheckupHistory = (assetId, data) => async (dispatch) => {
  try {
    if (assetId) {
      dispatch(receiveupdateReadCheckupHistory(true))
      await Service.Checkup.updateReadCheckupHistory(assetId, data)
      dispatch(receiveupdateReadCheckupHistory(false))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const getCheckupResultProducedTransaction = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      dispatch(receivegetCheckupResultProducedTransactionUnRead(true))
      // const response = await Service.Checkup.getCheckupResultProducedTransaction(patientId)
      const response = await Service.Checkup.getAllCheckup(patientId)
      let data = response.data
      let countUnread = data.length
      const newData = []
      data.forEach((key, i) => {
        key.healthCareProviderId = _function.popHash(key.healthCareProvider)
        key.patientAcknowledgeDateTime && countUnread--
        // Make Data
        newData.push({
          $class: '.CheckupResultProducedTransaction',
          transactionId: i,
          checkupHistory: key,
          timestamp: moment().toISOString()
        })
      })
      dispatch(receivegetCheckupResultProducedTransaction({}, countUnread))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const checkupAction = {
  getAllCheckup,
  getCheckup,
  getCheckupResultProducedTransaction,
  updateReadCheckupHistory
}
