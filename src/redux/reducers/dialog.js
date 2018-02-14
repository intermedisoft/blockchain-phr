import * as types from './../../constants/ActionTypes'

const dialog = {
  title: '',
  textBody: '',
  action: false,
  model: false,
  open: false,
  fn: undefined,
  deleted: false,
  fetchLoading: false
}
export default function DialogReducer(state = dialog, action) {
  switch (action.type) {
    case types.DAILOG.DISPLAY:
      return {
        ...state,
        title: action.title,
        textBody: action.textBody,
        fn: action.fn,
        open: true
      }
    case types.DAILOG.HIDE:
      return {
        ...state,
        open: false
      }
    case types.DAILOG.UPDAETDELETED:
      return {
        ...state,
        deleted: true
      }
    default:
      return state
  }
}
