import axios from 'axios'
export const setting = (configs) => {
  return axios.create({
    baseURL: configs.rest_ulr,
    headers: { 'x-access-token': configs.access_token }
  })
}

// export const setDefault = (configs, patientId) => {
//   return axios.create({
//     baseURL: configs.rest_ulr,
//     headers: { 'X-Access-Token': configs.access_token }
//   })
// }