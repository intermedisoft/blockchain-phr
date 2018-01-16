import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as reduxFormReducer } from 'redux-form'
import { firebaseReducer } from 'react-redux-firebase'

import auth from './auth'
import patient from './patient'
import fetchError from './fetchError'
import checkup from './checkup'

const barPersistConfig = {
  key: 'userLogin',
  storage: storage,
  version: 1,
  keyPrefix: '_',
  debug: true
}

const rootReducer = combineReducers({
  form: reduxFormReducer,
  firebase: firebaseReducer,
  patient,
  checkup,
  fetchError,
  auth: persistReducer(barPersistConfig, auth)
})

export default rootReducer
