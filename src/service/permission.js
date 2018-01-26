// import axios from 'axios'
import { setting } from './setting'

export default {
  getPermission: async (configs, patientId) => {
    if (patientId) {
      try {
        let esc = encodeURIComponent
        let filter = '{"where": {"patient": "resource:com.depa.blockchain.core.Patient#' + patientId + '","permissionType" : "REQUEST"}}'
        // let filter = '{"where": {"patient": "resource:com.depa.blockchain.core.Patient#1909800171665","permissionType" : "REQUEST"}}'
        return await setting(configs).get(`/api/PermissionLog?filter=${esc(filter)}`)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  getPermissionById: async (configs, permissionLogId) => {
    if (permissionLogId) {
      try {
        return await setting(configs).get(`/api/PermissionLog/${permissionLogId}`)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  updatePermission: async (configs, data) => {
    if (data) {
      try {
        return await setting(configs).post(`/api/PermissionTransaction`, data)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  updatePermissionReading: async (configs, data, permissionLogId) => {
    if (data) {
      try {
        return await setting(configs).put(`/api/PermissionLog/${permissionLogId}`, data)
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
