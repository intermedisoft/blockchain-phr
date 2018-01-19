import axios from 'axios'
export const setting = (configs) => {
  return axios.create({
    baseURL: 'http://192.168.9.88:3000/', //'https://ehrblox.com/', //configs.rest_ulr,
    headers: {
      'x-access-token': 'PL7PXg4ayTiYc8wcWvYndZeGR7mOtWudk6vHsvhVIxzlxC31cFX8t9E4yaeaAzrA' //configs.access_token
    }
  })
}
