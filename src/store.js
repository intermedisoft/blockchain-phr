import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import reducers from './redux/reducers'

const myLog = (store) => (next) => (action) => {
  // console.log('Log Action : ', action)
  next(action)
}

// const reducer = persistCombineReducers(config, reducers)

const middleware = [thunk, myLog]

export default function configStore () {
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      applyMiddleware(...middleware)
    )
  )
  store.subscribe(() => {
    console.log('Store', store.getState())
  })

  const persistor = persistStore(store)
  return { store, persistor }
}
