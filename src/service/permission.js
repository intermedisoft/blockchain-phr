// import axios from 'axios'
import { setting } from './setting'

export default {
  getPermission: async (configs, patientId) => {
    if (patientId) {
      try {
        let filter = '{"where": {"patient": "resource:com.depa.blockchain.core.Patient#1909800171665"}}'
        const permission = await setting(configs).get(`/api/PermissionLog/?filter=${filter}`)
        return permission
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
