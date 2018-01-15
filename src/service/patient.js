// import axios from 'axios'
import { setting } from './setting'

export default {
  getPatient: (configs, patientId) => {
    console.log('***********&&&&&&*********')
    console.log(patientId)
    console.log('***********&&&&&&*********')
    setting(configs).get('/Patient')
  }
}
