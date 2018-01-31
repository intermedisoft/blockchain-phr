// import axios from 'axios'
import { setting } from './setting'

export default {
  getXray: async (patientId) => {
    if (patientId) {
      try {
        await setting().then(async (call) => call.post(`/api/wallet/${patientId}/setDefault`))
        const xray = await setting().then(async (call) => call.get(`/api/Xray`))
        return xray
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
