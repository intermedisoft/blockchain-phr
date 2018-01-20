// import axios from 'axios'
import { setting } from './setting'

export default {
  getHealthProvider: async (configs, id) => {
    if (id) {
      try {
        return await setting(configs).get(`/api/HealthCareProvider/${id}`)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
