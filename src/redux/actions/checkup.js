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
      if (!response.data.length) {
        dispatch(receivegetAllCheckup({ nodata: true }))
      } else {
        let newAllCheckup = response.data
        newAllCheckup.forEach((key) => {
          let healthCareProviderID = key.healthCareProvider.split('#').pop()
          Service.HealthProvider.getHealthProvider(configs, healthCareProviderID).then((r) => {
            key.healthCareProviderName = r.data.healthCareProviderName
            dispatch(receivegetAllCheckup(newAllCheckup))
          })
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
