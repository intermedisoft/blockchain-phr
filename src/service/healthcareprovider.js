// import axios from 'axios'
import { setting } from './setting'

export default {
  getHealthProvider: async (id) => {
    if (id) {
      try {
        return await setting().then(async (call) => call.get(`/api/HealthCareProvider/${id}`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    } else {
      try {
        return await setting().then(async (call) => call.get(`/api/HealthCareProvider`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
