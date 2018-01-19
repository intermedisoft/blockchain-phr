import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const SnackbarComponent = (props) => {
  let open = false
  if (props) {
    open = true
  }
  setTimeout(() => {
    open = false
  }, 100)
  return (
    <Snackbar
      open={open}
      message={props.message}
      autoHideDuration={4000}
    // onRequestClose={this.handleRequestClose}
    />
  )
}

export default SnackbarComponent
