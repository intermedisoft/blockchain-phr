import { setting } from './setting'
export default {
  getAllCheckup: async (patientId) => {
    if (patientId) {
      try {
        await setting().then(async (call) => call.post(`/api/wallet/${patientId}/setDefault`))
        return await setting().then(async (call) => call.get(`/api/CheckupHistory`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  getCheckup: async (assetId) => {
    try {
      return await setting().then(async (call) => call.get(`/api/CheckupHistory/${assetId}`))
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  },
  getCheckupResultProducedTransaction: async (configs) => {
    try {
      return await setting().then(async (call) => call.get(`/api/CheckupResultProducedTransaction`))
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  },
  updateReadCheckupHistory: async (assetId, data) => {
    try {
      return await setting().then(async (call) => call.put(`/api/CheckupHistory/${assetId}`, data))
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  }
}
