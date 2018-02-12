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
          <div className={`cardHead`}>
            <div>Health Care Provider</div>
            <div>
              {data.healthCareProviderData && data.healthCareProviderData[0].healthCareProviderName}
            </div>
          </div>
          <div className={`cardContent`}>
            <table className={`tableViewColon`}>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{data.xrayName}</td>
                </tr>
                <tr>
                  <td>Result</td>
                  <td>{data.xrayResult}</td>
                </tr>
              </tbody>
            </table>
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