import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'

import { alertAction } from './../redux/actions/fetchError'

class ErrorModalControlled extends Component {

  onCloseModal = () => {
    this.props.closeModal()
  };

  render() {
    const err = this.props.Errors
    // const className = this.props.className
    const classErrorModal = 'errorModal'
    return (
      <Modal open={err.modalOpen} onClose={this.onCloseModal} classNames={{ overlay: `customOverlay ${classErrorModal}`, modal: 'customModal', closeIcon: 'customCloseIcon' }} little>
        <div className='modalTitle'>{err.header}</div>
        <div className={`modalContent ${err.header ? '' : 'noTitle'}`}>{err.message}</div>
        <div className={`btnAction`}>
          <button className={`btnPrimary`} onClick={() => window.location.reload()}>Try again</button>
        </div>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    closeModal: () => {
      dispatch(alertAction.clearAlert())
    }
  }
}
const mapStateToProps = (state) => {
  return { Errors: state.fetchError }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModalControlled)
