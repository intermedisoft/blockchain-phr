import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import registerServiceWorker from './registerServiceWorker'

import './App.scss'
import RouteRoot from './routes/RouteRoot'
import configStore from './store'
// import ErrorModalControlled from './components/Modal'

const { store, persistor } = configStore()

const onBeforeLift = () => {
  // return <ErrorModalControlled status={500} />
}

const loading = (
  <div className='loading'> LOADING </div>
)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={loading}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <RouteRoot />
    </PersistGate>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
