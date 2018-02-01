// import axios from 'axios'
import { setting } from './setting'

export default {
  getPatient: async (patientId) => {
    if (patientId) {
      try {
        await setting().then(async (call) => call.post(`/api/wallet/${patientId}/setDefault`))
        return await setting().then(async (call) => call.get(`/api/Patient/${patientId}`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  editPatient: async (patientId, data) => {
    if (patientId) {
      try {
        return await setting().then(async (call) => call.put(`/api/Patient/${patientId}`, data))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
