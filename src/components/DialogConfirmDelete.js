import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { DialogAction } from './../redux/actions/dialog'

class DialogConfirmDeleteComponent extends React.Component {
  handleClose = () => {
    this.props.closeDialog()
  }
  handleAction = (fn) => {
    fn()
    this.handleClose()
  }
  render() {
    const { open, model, title, textBody, fn } = { ...this.props.dialog }
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleAction(fn)}
      />,
    ]
    return (
      <Dialog
        title={title}
        actions={actions}
        modal={model}
        open={open}
        onRequestClose={this.handleClose}
      >
        {textBody}
      </Dialog>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    closeDialog: () => {
      dispatch(DialogAction.hideDialog())
    },
    updateDelete: (livepage) => {
      dispatch(DialogAction.updateDelete(livepage))
    }
  }
}
const mapStateToProps = (state) => {
  return {
    dialog: state.dialog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogConfirmDeleteComponent)
