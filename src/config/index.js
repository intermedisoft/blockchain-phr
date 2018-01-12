import configStore from './../store'
const { store } = configStore()

function af() {
  var newState = store.getState()
  console.log('**************************')
  console.log(newState)
  console.log('**************************')
}
export const conf = {
  BASE_API_URL: 'http://localhost:3002',
  XX: store.subscribe(af)
}

store.subscribe(af)
