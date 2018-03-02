import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { HeaderAction } from './../../redux/actions/header'
import { checkupAction } from './../../redux/actions/checkup'
import { permissionAction } from './../../redux/actions/permission'
import styles from '../../assets/style/themes/pages/checkup.scss'

require('moment/locale/th')

class CheckupViewerPage extends Component {
  state = {
    data: '',
    setRead: false
  }
  setTitleBar(value) {
    this.props.setHeader(moment(value).format('LL'))
  }

  updateToread(data) {
    const data2 = { ...data }
    const assetId = data2.assetId
    delete data2.assetId
    delete data2.healthCareProviderId
    delete data2.healthCareProviderData
    delete data2.$class
    this.props.updateReadCheckupHistory(assetId, Object.assign(data2, {
      patientAcknowledgeDateTime: moment().toISOString()
    }))
  }

  componentWillMount() {
    if (this.props.location.state === undefined) {
      if (this.props.match.params.id) {
        const id = this.props.match.params.id
        this.props.getCheckup(id)
      } else {
        this.props.history.push('/checkup')
        return false
      }
    } else {
      let data = this.props.location.state.data
      this.setState({ data })
      this.setTitleBar(data.dateTimeServe)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!isEmpty(this.props.checkup) && !this.props.header) {
      this.setTitleBar(this.props.checkup.dateTimeServe)
    }


    if (!nextState.setRead && nextState.data && !nextState.data.patientAcknowledgeDateTime) {
      this.setState({ setRead: true })
      this.updateToread(nextState.data)
      this.props.receivesetDataOnReading()
    }
  }

  render() {
    let pressureUp = 0
    let pressureDown = 0
    // let calcium_score_result = ''
    let data = this.state.data
    if (!data) {
      data = this.props.checkup
    }
    const { healthCareProvider, patients } = { ...this.props }
    if (data && data.pressure) {
      const pressure = data.pressure.split('/')
      pressureUp = pressure[0]
      pressureDown = pressure[1]
    }
    // if (data.calcium_score_result) {
    //   calcium_score_result = `data:image/jpeg;base64, ${data.calcium_score_result}`
    // } 
    return (
      (!isEmpty(data) && patients && !isEmpty(healthCareProvider)) &&
      <div className={`containerMain ${styles.checkupView}`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div className={`cardLabel`}>Health Care Provider</div>
            <div className={`cardValue`}>
              {
                data.healthCareProviderData ?
                  data.healthCareProviderData[0].healthCareProviderName : healthCareProvider.filter((Provider) => {
                    return Provider.healthCareProviderId === data.healthCareProviderId
                  })[0].healthCareProviderName
              }
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin`}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจร่างกายทั่วไปโดยแพทย์ (PE)</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${data.pulse === '' || data.pulse === undefined
                  ? '--fail' : data.pulse < 60 || data.pulse > 100
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>ชีพจร <span className={`resultsUnit`}>[60-100]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.pulse}</span>
                    <span className={`resultsUnit`}>bpm</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.pressure === '' || data.pressure === undefined
                  ? '--fail' : (pressureUp < 90 || pressureUp > 139) && (pressureDown < 60 || pressureDown > 89)
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>ความดัน <span className={`resultsUnit`}>[90-139/60-89]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.pressure}</span>
                    <span className={`resultsUnit`}>mmHg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจความสมบูรณ์ของเม็ดเลือด (CBC)</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${patients.sex === '' || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.rbc < 4.6 || data.rbc > 6.2
                      ? '--abNormal' : '--normal' : data.rbc < 4.2 && data.rbc > 5.4
                      ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>RBC <span className={`resultsUnit`}>[ช 4.6-6.2, ญ 4.2-5.4]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.rbc}</span>
                    <span className={`resultsUnit`}>Cell/mm^3</span>
                  </div>
                </div>
                <div className={`resultsGroup ${patients.sex === '' || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.hb < 14 || data.hb > 18
                      ? '--abNormal' : '--normal' : data.hb < 12 && data.hb > 16
                      ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>HB <span className={`resultsUnit`}>[ช 14-18, ญ 12-16]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.hb}</span>
                    <span className={`resultsUnit`}>g/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${patients.sex === '' || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.hct < 40 || data.hct > 54
                      ? '--abNormal' : '--normal' : data.hct < 37 && data.hct > 47
                      ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Hct <span className={`resultsUnit`}>[ช 40-54, ญ 37-47]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.hct}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.cbc_wbc === '' || data.cbc_wbc === undefined
                  ? '--fail' : data.cbc_wbc < 5.0 || data.cbc_wbc > 10.0
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>WBC <span className={`resultsUnit`}>[5.0-10.0]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.cbc_wbc}</span>
                    <span className={`resultsUnit`}>Cell/mm^3</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.pmn === '' || data.pmn === undefined
                  ? '--fail' : data.pmn < 40 || data.pmn > 75
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Neutrophil <span className={`resultsUnit`}>[40-75]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.pmn}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.lym === '' || data.lym === undefined
                  ? '--fail' : data.lym < 20 || data.lym > 50
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Lymphocyte <span className={`resultsUnit`}>[20-50]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.lym}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.mono === '' || data.mono === undefined
                  ? '--fail' : data.mono < 2 || data.mono > 10
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Monocyte <span className={`resultsUnit`}>[2-10]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.mono}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.eos === '' || data.eos === undefined
                  ? '--fail' : data.eos < 1 || data.eos > 6
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Eosinophil <span className={`resultsUnit`}>[1-6]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.eos}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>การวิเคราะห์ปัสสาวะ/Urine Analysis</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${data.ph === '' || data.ph === undefined
                  ? '--fail' : data.ph < 4.6 || data.ph > 8.0
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>ความเป็นกรดด่าง (pH) <span className={`resultsUnit`}>[4.6-8.0]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.ph}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.spgr === '' || data.spgr === undefined
                  ? '--fail' : data.spgr < 1.001 || data.spgr > 1.035
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>ความถ่วงจำเพาะ (Sp.gr.) <span className={`resultsUnit`}>[1.001-1.035]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.spgr}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.alm === '' || data.alm === undefined
                  ? '--fail' : data.alm < 3.5 || data.alm > 5
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Albumin <span className={`resultsUnit`}>[3.5-5]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.alm}</span>
                    <span className={`resultsUnit`}>gm/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.sugar === '' || data.sugar === undefined
                  ? '--fail' : data.sugar === 'Negative'
                    ? '--normal' : '--abNormal'}`}>
                  <div className={`resultsLabel`}>Sugar <span className={`resultsUnit`}>[Negative]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.sugar}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.ua_wbc === '' || data.ua_wbc === undefined
                  ? '--fail' : data.ua_wbc < 0 || data.ua_wbc > 2
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>เม็ดเลือดขาว (WBC) <span className={`resultsUnit`}>[0-2]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.ua_wbc}</span>
                    <span className={`resultsUnit`}>cell/HPT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจระดับน้ำตาลในเลือด</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${data.fbs === '' || data.fbs === undefined
                  ? '--fail' : data.fbs < 70 || data.fbs > 120
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>ระดับนาตาลในเลือด (FBS) <span className={`resultsUnit`}>[70-120]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.fbs}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>GlycatedHb – HbA1c</div>
                  <div>
                    <span className={`resultsValue`}>{data.hba1c}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจระดับไขมันในเลือด</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${data.chlt === '' || data.chlt === undefined
                  ? '--fail' : data.chlt >= 240
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Cholesterol <span className={`resultsUnit`}>[{`<240`}] </span></div>
                  <div>
                    <span className={`resultsValue`}>{data.chlt}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.trig === '' || data.trig === undefined
                  ? '--fail' : data.trig >= 200
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Triglyceride <span className={`resultsUnit`}>[{`<200`}]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.trig}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.hdl === '' || data.hdl === undefined
                  ? '--fail' : data.hdl <= 40
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>HDL <span className={`resultsUnit`}>[>40]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.hdl}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.ldl === '' || data.ldl === undefined
                  ? '--fail' : data.ldl >= 160
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>LDL <span className={`resultsUnit`}>[{`<160`}]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.ldl}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจการทำงานของตับ</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${patients.sgot === '' || patients.sgot === undefined
                  ? '--fail' : patients.sgot === 'M'
                    ? data.sgot < 8 || data.sgot > 46
                      ? '--abNormal' : '--normal' : data.sgot < 7 && data.sgot > 34
                      ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>SGOT <span className={`resultsUnit`}>[ช 8-46, ญ 7-34]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.sgot}</span>
                    <span className={`resultsUnit`}>U/L</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.sgpt === '' || data.sgpt === undefined
                  ? '--fail' : data.sgpt < 4 || data.sgpt > 36
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>SGPT <span className={`resultsUnit`}>[4-36]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.sgpt}</span>
                    <span className={`resultsUnit`}>U/L</span>
                  </div>
                </div>
                <div className={`resultsGroup --flex2`}>
                  <div className={`resultsLabel`}>เอนไซม์ในเซลล์เยื่อบุท่อน้ำดีของตับ</div>
                  <div>
                    <span className={`resultsValue`}>{data.alk}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจการทำงานของไต</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup ${data.creatinine === '' || data.creatinine === undefined
                  ? '--fail' : data.creatinine < 0.6 || data.creatinine > 1.3
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Creatinine <span className={`resultsUnit`}>[0.6-1.3]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.creatinine}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.bun === '' || data.bun === undefined
                  ? '--fail' : data.bun < 8 || data.bun > 10
                    ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>BUN <span className={`resultsUnit`}>[8-10]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.bun}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${patients.uric === '' || patients.uric === undefined
                  ? '--fail' : patients.uric === 'M'
                    ? data.uric < 2.1 || data.uric > 7.8
                      ? '--abNormal' : '--normal' : data.uric < 2.0 && data.uric > 6.4
                      ? '--abNormal' : '--normal'}`}>
                  <div className={`resultsLabel`}>Uric <span className={`resultsUnit`}>[2.1-7.8]</span></div>
                  <div>
                    <span className={`resultsValue`}>{data.uric}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>Calcium Score</div>
              <table className={`tableViewColon`}>
                <tbody>
                  <tr>
                    <td>Result</td>
                    <td>
                      <img src={calcium_score_result} />
                    </td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>
                      <img src={calcium_score_result} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>Conclusion</div>
              <ul className={`normal`}>
                {data.conclusion &&
                  data.conclusion.split('|').map((text, index) => text && <li key={index}>{text}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>Recommendation</div>
              <ul className={`normal`}>
                {data.recommendation &&
                  data.recommendation.split('|').map((text, index) => text && <li key={index}>{text}</li>)
                }
              </ul>
              {/* <ul className={`normal`}>
              <li>ออกกำลังกายอย่างต่อเนื่อง อย่างน้อยวันละ 30 นาที เป็นเวลา 3-5 วันต่อสัปดาห์</li> 
            </ul> */}
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
    getCheckup: (assetId) => {
      dispatch(checkupAction.getCheckup(assetId))
    },
    updateReadCheckupHistory: (assetId, data) => {
      dispatch(checkupAction.updateReadCheckupHistory(assetId, data))
    },
    receivesetDataOnReading: () => {
      dispatch(permissionAction.receivesetDataOnReading(null, true))
    }
  }
}

const mapStateToProps = state => (
  {
    header: state.header.text,
    checkup: state.checkup.dataOnSelected.data,
    healthCareProvider: state.healthCareProvider.data,
    patients: state.patient.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CheckupViewerPage)