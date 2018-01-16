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
    // const { open } = this.state;
    return (
      <div>
        <Modal open={err.modalOpen} onClose={this.onCloseModal} little>
          <h2>{err.message}</h2>
        </Modal>
      </div>
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
