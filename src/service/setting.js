import axios from 'axios'
export const setting = (configs) => {
  return axios.create({
    baseURL: 'http://192.168.9.88:3000/', //'https://ehrblox.com/', //configs.rest_ulr,
    headers: {
      'x-access-token': 'FDpyltW8RUrwOSiLPKD2UIFEiCLAJM9cZeJX6U3Pu0LQSTmV90YZbEzoS4UAFRiD' //configs.access_token
    }
  })
}
