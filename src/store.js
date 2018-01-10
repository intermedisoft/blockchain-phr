import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import reducers from './redux/reducers'
import firebaseConfig from './config/firebase'

const myLog = (store) => (next) => (action) => {
  // console.log('Log Action : ', action)
  next(action)
}

// const reducer = persistCombineReducers(config, reducers)
const reduxConfig = {
  userProfile: 'users',
  enableLogging: false
}
const middleware = [thunk, thunk.withExtraArgument(getFirebase), myLog]

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default function configStore () {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      reactReduxFirebase(firebase, reduxConfig),
      applyMiddleware(...middleware)
    )
  )
  store.subscribe(() => {
    console.log('Store', store.getState())
  })

  const persistor = persistStore(store)
  return { store, persistor }
}
