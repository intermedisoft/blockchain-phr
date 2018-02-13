import React, { Component } from 'react'
import { connect } from 'react-redux'

import { HeaderAction } from './../../redux/actions/header'

class RevokeViewerPage extends Component {
  state = {}
  handleRevokeProvider = () => {
    console.log(this.props.location.state.data)
  }
  componentDidMount() {
    this.props.setHeader('Revoke Provider')
  }
  render() {
    const data = this.props.location.state.data
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div>{data.healthCareProviderName}</div>
          </div>
          <div className={`btnAction`}>
            <button onClick={() => this.handleRevokeProvider()} className={`btnPrimary`}>Revoke</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(RevokeViewerPage) 