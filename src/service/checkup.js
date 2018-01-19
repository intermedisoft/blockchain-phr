// import axios from 'axios'
import { setting } from './setting'
import { Service } from './'
export default {
  getAllCheckup: async (configs, patientId) => {
    if (patientId) {
      try {
        await setting(configs).post(`/api/wallet/${patientId}/setDefault`)
        const allCheckup = await setting(configs)
          // .get(`/api/queries/listAllCheckupHistoryOfPatient?patientIdParam=${patientId}`)
          // .get(`/api/queries/listAllCheckupHistoryOfPatient?patientIdParam=resource:com.depa.blockchain.core.Patient#${patientId}`)
          .get(`/api/CheckupHistory`)
        let newAllCheckup = allCheckup
        newAllCheckup.data.forEach((key) => {
          let healthCareProviderID = key.healthCareProvider.split('#').pop()
          Service.HealthProvider.getHealthProvider(configs, healthCareProviderID).then((r) => {
            key.healthCareProviderName = r.data.healthCareProviderName
            key._pname = r.data.healthCareProviderName
          })
        })
        return newAllCheckup
      } catch (error) {
        return Promise.reject(new Error(error))
      }
    }
  },
  getCheckup: async (configs, id) => {
    try {
      const data = await setting(configs)
        .get(`/api/ServiceHistory/${id}`)
      return data
    } catch (error) {
      return Promise.reject(new Error(error))
    }
  }
}
