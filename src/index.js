import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import './App.scss'
import RouteRoot from './routes/RouteRoot'
import configStore from './store'
import ErrorModalControlled from './components/Modal'

import NotificationActionPage from './containers/notification/nofi'

const AppbarStyles = () => getMuiTheme({
  fontFamily: 'Kanit, sans-serif',
  palette: {
    primary1Color: '#1f64c8',
    textColor: '#444444'
  }
})

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
      <NotificationActionPage />
      <MuiThemeProvider muiTheme={AppbarStyles()}>
        <RouteRoot />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
