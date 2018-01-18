import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import { connect } from 'react-redux'
import { HeaderAction } from './../../redux/actions/header'
import { Link } from 'react-router-dom';

require('moment/locale/th')

class NotificationViewerPage extends Component {
  state = {
    data: ''
  }

  componentWillMount() {
    console.log('ssss')
    // if (this.props.location.state === undefined) {
    //   this.props.history.push('/checkup')
    //   return false
    // }
    // this.setState({
    //   data: this.props.location.state.data
    // })
    // let visitDate = moment(this.props.location.state.data.dateTimeServe).format('LL')
    this.props.setHeader('Request permission')
  }

  render() {
    // const id = this.props.match.params.id
    // const data = this.state.data
    // console.log(data)
    return (
      <div className='containerMain'>
        <div className='card'>
          <div className='cardHead'>Request permission</div>
          <div className='cardContent'> Health Care Provider : <b>Pensook Clinic</b></div>
          <div className="btnAction">
            <button onClick={() => window.history.back()} className={`btnPrimary`}>Don't Allow</button>
            <button onClick={() => window.history.back()} className={`btnPrimary`}>Allow</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewerPage)