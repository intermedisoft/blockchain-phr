import axios from 'axios'
import firebase from './../config/database'

export const wsURL = async () => {
  const conf = await firebase.database().ref(`configs`).once('value')
  const _CONFIG = conf.val()
  return _CONFIG.ws_ulr
}
export const setting = async (configs) => {
  const conf = await firebase.database().ref(`configs`).once('value')
  const _CONFIG = conf.val()
  return axios.create({
    baseURL: _CONFIG.rest_ulr,
    headers: {
      'x-access-token': _CONFIG.access_token
    }
  })
}
