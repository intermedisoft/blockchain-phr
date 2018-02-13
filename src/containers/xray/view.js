import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { HeaderAction } from './../../redux/actions/header'
import { xrayAction } from './../../redux/actions/xray'

require('moment/locale/th')

class XrayViewerPage extends Component {
  state = {
    data: '',
    setRead: false
  }

  updateToread(data) {
    const data2 = { ...data }
    const assetId = data2.assetId
    delete data2.assetId
    delete data2.healthCareProviderId
    delete data2.healthCareProviderData
    delete data2.$class
    this.props.updateReadXrayHistory(assetId, Object.assign(data2, {
      patientAcknowledgeDateTime: moment().toISOString()
    }))
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/xray')
      return false
    }
    this.setState({
      data: this.props.location.state.data
    })
    let visitDate = moment(this.props.location.state.data.dateTimeService).format('LL')
    this.props.setHeader(visitDate)
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.setRead && nextState.data && !nextState.data.patientAcknowledgeDateTime) {
      this.setState({ setRead: true })
      this.updateToread(nextState.data)
    }
  }
  render() {
    const data = this.state.data
    return (
      data &&
      <div className={`containerMain`}>
        <div className={`card --view`}>
          <div className={`head`}>
            <div className={`label`}>Health Care Provider</div>
            <div className={`value`}>
              {data.healthCareProviderData && data.healthCareProviderData[0].healthCareProviderName}
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin`}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>{data.xrayName}</div>
              <pre>{data.xrayResult}</pre>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setHeader: (text) => {
      dispatch(HeaderAction.setHeader(text))
    },
    updateReadXrayHistory: (assetId, data) => {
      dispatch(xrayAction.updateReadXrayHistory(assetId, data))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text,
    updateReading: state.xray.xrayHistory.updateReading
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(XrayViewerPage)