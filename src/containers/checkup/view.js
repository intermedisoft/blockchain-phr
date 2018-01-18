import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
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
    // const id = this.props.match.params.id
    const data = this.state.data
    // console.log(data)
    return (
      <div className='containerMain'>
        <div className='card'>
          <table className="tableView">
            <tbody>
              <tr>
                <td>ALK</td>
                <td>:</td>
                <td>{data.alk}</td>
              </tr>
              <tr>
                <td>ALM</td>
                <td>:</td>
                <td>{data.alm}</td>
              </tr>
              <tr>
                <td>Asset ID</td>
                <td>:</td>
                <td>{data.assetId}</td>
              </tr>
              <tr>
                <td>BUN</td>
                <td>:</td>
                <td>{data.bun}</td>
              </tr>
              <tr>
                <td>CALCIUM SCORE</td>
                <td>:</td>
                <td>{data.calcium_score_result}</td>
              </tr>
              <tr>
                <td>CBC WBC</td>
                <td>:</td>
                <td>{data.cbc_wbc}</td>
              </tr>
              <tr>
                <td>chlt</td>
                <td>:</td>
                <td>{data.chlt}</td>
              </tr>
              <tr>
                <td>creatinine</td>
                <td>:</td>
                <td>{data.creatinine}</td>
              </tr>
              <tr>
                <td>eos</td>
                <td>:</td>
                <td>{data.eos}</td>
              </tr>
              <tr>
                <td>fbs</td>
                <td>:</td>
                <td>{data.fbs}</td>
              </tr>
              <tr>
                <td>hb</td>
                <td>:</td>
                <td>{data.hb}</td>
              </tr>
              <tr>
                <td>hba1c</td>
                <td>:</td>
                <td>{data.hba1c}</td>
              </tr>
              <tr>
                <td>hct</td>
                <td>:</td>
                <td>{data.hct}</td>
              </tr>
              <tr>
                <td>hdl</td>
                <td>:</td>
                <td>{data.hdl}</td>
              </tr>
              <tr>
                <td>healthCareProvider</td>
                <td>:</td>
                <td>{data.healthCareProvider.healthCareProviderName}</td>
              </tr>
              <tr>
                <td>ldl</td>
                <td>:</td>
                <td>{data.ldl}</td>
              </tr>
              <tr>
                <td>lym</td>
                <td>:</td>
                <td>{data.lym}</td>
              </tr>
              <tr>
                <td>mono</td>
                <td>:</td>
                <td>{data.mono}</td>
              </tr>
              <tr>
                <td>ph</td>
                <td>:</td>
                <td>{data.ph}</td>
              </tr>
              <tr>
                <td>pmn</td>
                <td>:</td>
                <td>{data.pmn}</td>
              </tr>
              <tr>
                <td>pressure</td>
                <td>:</td>
                <td>{data.pressure}</td>
              </tr>
              <tr>
                <td>pulse</td>
                <td>:</td>
                <td>{data.pulse}</td>
              </tr>
              <tr>
                <td>rbc</td>
                <td>:</td>
                <td>{data.rbc}</td>
              </tr>
              <tr>
                <td>sgot</td>
                <td>:</td>
                <td>{data.sgot}</td>
              </tr>
              <tr>
                <td>sgpt</td>
                <td>:</td>
                <td>{data.sgpt}</td>
              </tr>
              <tr>
                <td>spgr</td>
                <td>:</td>
                <td>{data.spgr}</td>
              </tr>
              <tr>
                <td>sugar</td>
                <td>:</td>
                <td>{data.sugar}</td>
              </tr>
              <tr>
                <td>trig</td>
                <td>:</td>
                <td>{data.trig}</td>
              </tr>
              <tr>
                <td>ua_wbc</td>
                <td>:</td>
                <td>{data.ua_wbc}</td>
              </tr>
              <tr>
                <td>uric</td>
                <td>:</td>
                <td>{data.uric}</td>
              </tr>
            </tbody>
          </table>
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