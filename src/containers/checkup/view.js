import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import moment from 'moment'
import { connect } from 'react-redux'
import { HeaderAction } from './../../redux/actions/header'

require('moment/locale/th')

class CheckupViewerPage extends Component {
  state = {
    data: ''
  }

  componentWillMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/checkup')
      return false
    }
    this.setState({
      data: this.props.location.state.data
    })
    let visitDate = moment(this.props.location.state.data.dateTimeServe).format('LL')
    this.props.setHeader(visitDate)
  }

  render() {
    const id = this.props.match.params.id
    const data = this.state.data
    // console.log(data)
    return (
      <div className='containerMain'>
        <div className='card'>
          <div>
            <div>
              <span>ALK: </span> <span>{data.alk}</span>
            </div>
            <div>
              <span>ALM: </span> <span>{data.alm}</span>
            </div>
            <div>
              <span>Asset ID: </span> <span>{data.assetId}</span>
            </div>
            <div>
              <span>BUN: </span> <span>{data.bun}</span>
            </div>
            <div>
              <span>CALCIUM SCORE: </span> <span>{data.calcium_score_result}</span>
            </div>
            <div>
              <span>CBC WBC: </span> <span>{data.cbc_wbc}</span>
            </div>
            <div>
              <span>chlt: </span> <span>{data.chlt}</span>
            </div>
            <div>
              <span>creatinine: </span> <span>{data.creatinine}</span>
            </div>

            <div>
              <span>eos: </span> <span>{data.eos}</span>
            </div>
            <div>
              <span>fbs: </span> <span>{data.fbs}</span>
            </div>
            <div>
              <span>hb: </span> <span>{data.hb}</span>
            </div>
            <div>
              <span>hba1c: </span> <span>{data.hba1c}</span>
            </div>
            <div>
              <span>hct: </span> <span>{data.hct}</span>
            </div>
            <div>
              <span>hdl: </span> <span>{data.hdl}</span>
            </div>
            <div>
              <span>healthCareProvider: </span> <span>{data.healthCareProvider.healthCareProviderName}</span>
            </div>
            <div>
              <span>ldl: </span> <span>{data.ldl}</span>
            </div>
            <div>
              <span>lym: </span> <span>{data.lym}</span>
            </div>
            <div>
              <span>mono: </span> <span>{data.mono}</span>
            </div>
            <div>
              <span>ph: </span> <span>{data.ph}</span>
            </div>
            <div>
              <span>pmn: </span> <span>{data.pmn}</span>
            </div>
            <div>
              <span>pressure: </span> <span>{data.pressure}</span>
            </div>
            <div>
              <span>pulse: </span> <span>{data.pulse}</span>
            </div>
            <div>
              <span>rbc: </span> <span>{data.rbc}</span>
            </div>
            <div>
              <span>sgot: </span> <span>{data.sgot}</span>
            </div>
            <div>
              <span>sgpt: </span> <span>{data.sgpt}</span>
            </div>
            <div>
              <span>spgr: </span> <span>{data.spgr}</span>
            </div>
            <div>
              <span>sugar: </span> <span>{data.sugar}</span>
            </div>
            <div>
              <span>trig: </span> <span>{data.trig}</span>
            </div>
            <div>
              <span>ua_wbc: </span> <span>{data.ua_wbc}</span>
            </div>
            <div>
              <span>uric: </span> <span>{data.uric}</span>
            </div>
          </div>
          <Divider />
          <div>
            <h2>Conclusion</h2>
            <ul>
              <li>เสี่ยงต่อการเป็นโรคเบาหวาน , ไขมันในเลือดสูง , น้ำหนักเกิน </li>
            </ul>
            <h2>Recommendation</h2>
            <ul>
              <li>ออกกำลังกายอย่างต่อเนื่อง อย่างน้อยวันละ 30 นาที เป็นเวลา 3-5 วันต่อสัปดาห์</li>
              <li>หลีกเลี่ยงอาหารที่มีน้ำตาลสูง เช่น น้ำอัดลม ขนมหวาน และผลไม้หวานจัด</li>
              <li>พยายามควบคุมน้ำหนักให้อยู่ใยเกณฑ์มาตรฐาน</li>
              <li>ควรตรวจ Caloum Score เพิ่มเติม</li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckupViewerPage)