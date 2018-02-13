import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CircularProgress } from './../../components'
import { HeaderAction } from './../../redux/actions/header'
import { revokeProviderAction } from './../../redux/actions/revokeprovider'

class RevokeViewerPage extends Component {
  state = {
    isDone: false
  }
  handleRevokeProvider = () => {
    let data2 = { ...this.props.location.state.data }
    let patientId = data2.patientId
    data2.patient = `resource:com.depa.blockchain.core.Patient#${patientId}`
    data2.permissionType = 'REVOKE'
    delete data2.key
    delete data2.patientId
    delete data2.healthCareProviderName
    this.props.update(data2, patientId)
    this.setState({
      isDone: true
    })
  }
  componentDidMount() {
    this.props.setHeader('Revoke Provider')
  }
  render() {
    const data = this.props.location.state.data
    const isLoading = this.props.isLoading
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div>Revoke Provider</div>
          </div>
          <div className={`cardContent`}>
            {data.healthCareProviderName}
          </div>
          {
            isLoading ? <CircularProgress /> :
              <div className={`btnAction`}>
                {
                  // <button onClick={() => this.handleRevokeProvider()} className={`btnPrimary`}>Revoke</button>
                  this.state.isDone ? `Revoked !` : <button onClick={() => this.handleRevokeProvider()} className={`btnPrimary`}>Revoke</button>
                }
              </div>
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    }, update: (data, patientId) => {
      dispatch(revokeProviderAction.updateRevokeProvider(data, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text,
    isLoading: state.revokeprovider.isLoading
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(RevokeViewerPage) 