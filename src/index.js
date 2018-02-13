import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { MuiCustomTheme } from './assets/style/vendors/materialUI/js/index'
import './App.scss'
import RouteRoot from './routes/RouteRoot'
import configStore from './store'
import ErrorModalControlled from './components/Modal'
import LoadStarterPage from './Starter'

const { store, persistor } = configStore()

const onBeforeLift = () => {
  // notificationAction.getSocket()
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
      <ErrorModalControlled />
      <LoadStarterPage />
      <MuiThemeProvider muiTheme={MuiCustomTheme()}>
        <RouteRoot />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
