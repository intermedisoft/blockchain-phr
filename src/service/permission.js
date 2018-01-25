// import axios from 'axios'
import { setting } from './setting'

export default {
  getPermission: async (configs, patientId) => {
    if (patientId) {
      try {
        let esc = encodeURIComponent
        let filter = `{"where": {"patient": "resource:com.depa.blockchain.core.Patient#${patientId}"}}`
        return await setting(configs).get(`/api/PermissionLog?filter=${esc(filter)}`)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
