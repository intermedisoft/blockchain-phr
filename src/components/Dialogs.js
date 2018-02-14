import React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'

import { DialogAction } from './../redux/actions/dialog'

class Dialog extends React.Component {

  onCloseModal = () => {
    this.props.closeDialog()
  }
  handleAction = (fn) => {
    fn()
    this.onCloseModal()
  }

  render() {
    const { open, title, textBody, fn } = { ...this.props.dialog }
    const classErrorModal = 'errorModal'
    return (
      <Modal open={open} onClose={this.onCloseModal} classNames={{ overlay: `customOverlay ${classErrorModal}`, modal: 'customModal', closeIcon: 'customCloseIcon' }} little>
        <div className='modalTitle'>{title}</div>
        <div className={`modalContent ${title ? '' : 'noTitle'}`}>{textBody}</div>
        <div className={`btnAction --btn2`}>
          <button className={`btnPrimary`} onClick={() => this.onCloseModal()}>No</button>
          <button className={`btnPrimary`} onClick={() => this.handleAction(fn)}>Yes</button>
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dialog)
