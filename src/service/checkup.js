// import axios from 'axios'
import { setting } from './setting'

export default {
  getAllCheckup: async (configs, patientId) => {
    if (patientId) {
      try {
        const allCheckup = await setting(configs)
          .get(`/api/queries/listAllCheckupHistoryOfPatient?patientIdParam=${patientId}`)
        return allCheckup
      } catch (error) {
        return Promise.reject(new Error(error.response.status))
      }
    }
  },
  getCheckup: async (configs, id) => {
    try {
      const data = await setting(configs)
        .get(`/api/ServiceHistory/${id}`)
      return data
    } catch (error) {
      return Promise.reject(new Error(error.response.status))
    }
  }
}
