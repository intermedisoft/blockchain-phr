import * as types from './../../constants/ActionTypes'

const displayDialog = (title, textBody, fn) => ({
  type: types.DAILOG.DISPLAY,
  title,
  textBody,
  fn
})

const hideDialog = () => ({
  type: types.DAILOG.HIDE
})

const updateDelete = (livepage) => ({
  type: types.DAILOG.UPDAETDELETED,
  livepage
})

export const DialogAction = {
  displayDialog,
  hideDialog,
  updateDelete
}
