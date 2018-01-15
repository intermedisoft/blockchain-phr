// import axios from 'axios'
import { setting } from './setting'

export default {
  getPatient: async (configs, patientId) => {
    if (patientId) {
      await setting(configs).post(`/api/wallet/${patientId}/setDefault`)
      const profile = await setting(configs).get(`/api/Patient/${patientId}`)
      return profile
    }
  }
}
