import axios from 'axios'
import firebase from './../config/database'


export const setting = async (configs) => {
  const conf = await firebase.database().ref(`configs`).once('value')
  const _CONFIG = conf.val()
  return axios.create({
    baseURL: _CONFIG.rest_ulr,
    headers: {
      'x-access-token': _CONFIG.access_token
    }
  })

  // return axios.create({
  //   baseURL: 'http://192.168.9.88:3000/', //'https://ehrblox.com/', //configs.rest_ulr,
  //   headers: {
  //     'x-access-token': 'FDpyltW8RUrwOSiLPKD2UIFEiCLAJM9cZeJX6U3Pu0LQSTmV90YZbEzoS4UAFRiD' //configs.access_token
  //   }
  // })
}
