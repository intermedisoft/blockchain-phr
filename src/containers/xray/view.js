import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
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
    const Img = data.xrayImage
    return (
      <div className={`containerMain`}>
        <div className={`card`}>
          <table className={`tableView`}>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{data.xrayName}</td>
              </tr>
              {/* <tr>
                <td>Images</td>
                <td>:</td>
                <td>
                  <img src={`data:image/jpeg;base64,${Img}`} alt='Xray Image' />
                </td>
              </tr> */}
              <tr>
                <td>Result</td>
                <td>:</td>
                <td>{data.xrayResult}</td>
              </tr>
              <tr>
                <td>Health Care Provider</td>
                <td>:</td>
                <td>{data.healthCareProviderData && data.healthCareProviderData[0].healthCareProviderName}</td>
              </tr>
            </tbody>
          </table>
          <Divider />
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