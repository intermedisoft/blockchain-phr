import axios from 'axios'
export const setting = (configs) => {
  return axios.create({
    baseURL: configs.rest_ulr,
    headers: { 'X-Access-Token': configs.access_token }
  })
}
