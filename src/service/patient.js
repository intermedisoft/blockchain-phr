// import axios from 'axios'
import { setting } from './setting'

export default {
  getPatient: async (configs, patientId) => {
    if (patientId) {
      try {
        await setting(configs).post(`/api/wallet/${patientId}/setDefault`)
        const profile = await setting(configs).get(`/api/Patient/${patientId}`)
        return profile
      } catch (error) {
        return Promise.reject(new Error(error.response.status))
      }
    }
  },
  putPatient: async (configs, patientId, data) => {
    if (patientId) {
      try {
        await setting(configs).put(`/api/Patient/${patientId}`, data)
      } catch (error) {
        return Promise.reject(new Error(error.response.status))
      }
    }
  }
}
