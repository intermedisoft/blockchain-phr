import React, { Component } from 'react'
import Modal from 'material-ui/Modal'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'

class ErrorModalControlled extends Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const err = this.props.Errors
    return (
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div>
          <Typography type='title' id='modal-title'>
            Text in a modal
        </Typography>
          <Typography type='subheading' id='simple-modal-description'>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
          <ErrorModalControlled />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return { Errors: state.fetchError }
}

export default connect(mapStateToProps)(ErrorModalControlled)
