import axios from 'axios'
import { conf } from './../config'
console.log('*******,,,,,,,,,,,,,,*******************')
console.log(conf.XXX)
console.log('*************,,,,,,,,,,,,,,,,*************')
export default {
  getPatient: () => axios.get(`${conf.BASE_API_URL}/Patient`)
}
