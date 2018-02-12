import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { HeaderAction } from './../../redux/actions/header'

require('moment/locale/th')

class XrayViewerPage extends Component {
  state = {
    data: ''
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
  render() {
    const data = this.state.data
    // const Img = data.xrayImage
    // console.log(Img && Img.replace(/_/g, '/'))
    return (
      data &&
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHeadView`}>
            <div className={`cardHeadViewLabel`}>Health Care Provider</div>
            <div className={`cardHeadViewValue`}>
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
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(XrayViewerPage)