import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'

import { alertAction } from './../redux/actions/fetchError'

class ErrorModalControlled extends Component {
  // state = {
  //   open: true,
  // };
  // handleClose = () => {
  //   this.setState({ open: false });
  //   // this.props.closeModal()
  // }
  // onOpenModal = () => {
  //   this.setState({ open: true });
  // };

  onCloseModal = () => {
    this.props.closeModal()
  };

  render() {
    const err = this.props.Errors
    const className = this.props.className
    const modalTitle = this.props.modalTitle
    // const { open } = this.state;
    return (
        <Modal open={err.modalOpen} onClose={this.onCloseModal} classNames={{ overlay: `customOverlay ${className}`, modal: 'customModal', closeIcon: 'customCloseIcon' }} little>
          <div className='modalTitle'>{modalTitle}</div>
          <div className={`modalContent ${modalTitle ? '' : 'noTitle'}`}>{err.message}</div>
        </Modal>
    );
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
