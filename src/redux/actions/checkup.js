import * as types from './../../constants/ActionTypes'
import { Service } from './../../service'
import { ActionErrHandle } from './../error.action'

const receivegetAllCheckup = (data) => ({
  type: types.CHECKUP.GETALL,
  payload: data
})

const getAllCheckup = (configs, patientId) => async (dispatch) => {
  try {
    if (configs && patientId) {
      const response = await Service.Checkup.getAllCheckup(configs, patientId)
      dispatch(receivegetAllCheckup(response.data))
    }
  } catch (error) {
    ActionErrHandle(dispatch, error)
  }
}

export const checkupAction = {
  getAllCheckup
}
