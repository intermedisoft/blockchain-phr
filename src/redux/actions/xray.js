import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'
import { _function } from './../../function'
// import moment from 'moment'

const receivegetAllXray = (data) => ({
  type: types.XRAY.GET,
  payload: data
})
const receivegetXrayResultProducedTransactionUnRead = (data) => ({
  type: types.XRAY.GETXRAYTRANSACTIONUNREAD,
  payload: data
})

const receivegetXrayResultProducedTransaction = (data, unRead) => ({
  type: types.XRAY.GETXRAYTRANSACTION,
  payload: data,
  unRead
})

const receivegetXrayResultProducedTransactionUnReadOnly = (unread) => ({
  type: types.XRAY.GETXRAYTRANSACTIONUNREADONLY,
  payload: unread
})

const receiveupdateReadXrayHistory = (action) => ({
  type: types.XRAY.UPDATEREADINGXRAYHISTORY,
  payload: action
})

const getAllXray = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      const response = await Service.Xray.getXray(patientId)
      if (!response.data.length) {
        dispatch(receivegetAllXray({ nodata: true }))
      } else {
        let data = response.data
        let countUnread = data.length
        data.forEach((key, i) => {
          key.healthCareProviderId = _function.popHash(key.healthCareProvider)
          key.patientAcknowledgeDateTime && countUnread--
          if (i + 1 === data.length) {
            dispatch(receivegetAllXray(data))
            dispatch(receivegetXrayResultProducedTransactionUnReadOnly(countUnread))
          }
        })
      }
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const getXrayResultProducedTransaction = (patientId) => async (dispatch) => {
  try {
    if (patientId) {
      dispatch(receivegetXrayResultProducedTransactionUnRead(true))
      let response
      let count = 0
      while (response === undefined) {
        try {
          response = await Service.Xray.getXray(patientId)
        } catch (err) {
          if (++count === 3) {
            throw err
          }
        }
      }
      let data = response.data
      let countUnread = data.length
      data.forEach((key, i) => {
        key.healthCareProviderId = _function.popHash(key.healthCareProvider)
        key.patientAcknowledgeDateTime && countUnread--
        delete key.xrayImage
      })
      dispatch(receivegetXrayResultProducedTransaction({}, countUnread))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

const updateReadXrayHistory = (assetId, data) => async (dispatch) => {
  try {
    if (assetId) {
      dispatch(receiveupdateReadXrayHistory(true))
      await Service.Xray.updateReadXrayHistory(assetId, data)
      dispatch(receiveupdateReadXrayHistory(false))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const xrayAction = {
  getAllXray,
  getXrayResultProducedTransaction,
  updateReadXrayHistory
}
