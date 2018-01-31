// import axios from 'axios'
import { setting } from './setting'

export default {
  getPermission: async (configs, patientId) => {
    if (patientId) {
      try {
        let esc = encodeURIComponent
        let filter = '{"where": {"patient": "resource:com.depa.blockchain.core.Patient#' + patientId + '","permissionType" : "REQUEST"}}'
        return await setting().then(async (call) => call.get(`/api/PermissionLog?filter=${esc(filter)}`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  getPermissionById: async (configs, permissionLogId) => {
    if (permissionLogId) {
      try {
        return await setting().then(async (call) => call.get(`/api/PermissionLog/${permissionLogId}`))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  updatePermission: async (configs, data) => {
    if (data) {
      try {
        return await setting().then(async (call) => call.post(`/api/PermissionTransaction`, data))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  updatePermissionReading: async (configs, data, permissionLogId) => {
    if (data) {
      try {
        return await setting().then(async (call) => call.put(`/api/PermissionLog/${permissionLogId}`, data))
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  }
}
