// import axios from 'axios'
import { setting } from './setting'

export default {
  getXray: async (configs, patientId) => {
    if (patientId) {
      try {
        await setting(configs).post(`/api/wallet/${patientId}/setDefault`)
        const xray = await setting(configs).get(`/api/Xray`)
        return xray
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
