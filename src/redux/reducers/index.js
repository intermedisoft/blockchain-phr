import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { reducer as reduxFormReducer } from 'redux-form'
import { firebaseReducer } from 'react-redux-firebase'

// import users from './users'
// import alert from './alert'
// import authen from './authen'
// import fetchError from './fetchError'

// const barPersistConfig = {
//   key: 'userLogin',
//   storage: storage,
//   version: 1,
//   keyPrefix: '_',
//   debug: true
// }

const rootReducer = combineReducers({
  form: reduxFormReducer,
  firebase: firebaseReducer
  // users,
  // alert,
  // fetchError,
  // authen: persistReducer(barPersistConfig, authen)
})

export default rootReducer
