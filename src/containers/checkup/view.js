import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

import { HeaderAction } from './../../redux/actions/header'
import { checkupAction } from './../../redux/actions/checkup'
import { permissionAction } from './../../redux/actions/permission'

import { _function } from './../../function'

require('moment/locale/th')

class CheckupViewerPage extends Component {
  state = {
    data: ''
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

    //Update 
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
      const coreType = _function.popHash(data.$class, '.')
      if (coreType === 'CheckupResultProducedTransaction') {
        /* OPEN FROM NOTIFICATION PAGE */
        let _temp = data.healthCareProviderData
        data = data.checkupHistory
        data.healthCareProviderData = _temp
        //UPDATE READ 
        if (!data.patientAcknowledgeDateTime) {
          this.updateToread(data)
          this.props.receivesetDataOnReading()
        }
      }
      this.setState({
        data: data
      })
      this.setTitleBar(data.dateTimeServe)
    }
  }

  componentWillUpdate() {
    if (!isEmpty(this.props.checkup) && !this.props.header) {
      this.setTitleBar(this.props.checkup.dateTimeServe)
    }
  }

  render() {
    let data = this.state.data
    if (!data) {
      data = this.props.checkup
    }
    const { healthCareProvider, patients } = { ...this.props }
    console.log(this.props)
    return (
      (!isEmpty(data) && patients && !isEmpty(healthCareProvider)) &&
      <div className={`containerMain`}>
        <div className={`card`}>
          <div className={`cardHead`}>
            <div>Health Care Provider</div>
            <div>
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
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>ตรวจร่างกายทั่วไปโดยแพทย์ (PE)</div>
              <div className={`resultsCard`}>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>ชีพจร</div>
                  <div>
                    <span className={`resultsValue`}>{data.pulse}</span>
                    <span className={`resultsUnit`}>bpm</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>ความดัน</div>
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
                <div className={`resultsGroup ${patients.sex || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.rbc < 4.6 || data.rbc > 6.2
                      ? '--abNormal' : 'normal' : data.rbc < 4.2 && data.rbc > 5.4
                      ? '--abNormal' : 'normal'}`}>
                  <div className={`resultsLabel`}>RBC</div>
                  <div>
                    <span className={`resultsValue`}>{data.rbc}</span>
                    <span className={`resultsUnit`}>Cell/mm^3</span>
                  </div>
                </div>
                <div className={`resultsGroup ${patients.sex === '' || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.hb < 14 || data.hb > 18
                      ? '--abNormal' : 'normal' : data.hb < 12 && data.hb > 16
                      ? '--abNormal' : 'normal'}`}>
                  <div className={`resultsLabel`}>HB</div>
                  <div>
                    <span className={`resultsValue`}>{data.hb}</span>
                    <span className={`resultsUnit`}>g/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup ${patients.sex === '' || patients.sex === undefined
                  ? '--fail' : patients.sex === 'M'
                    ? data.hct < 40 || data.hct > 54
                      ? '--abNormal' : 'normal' : data.hct < 37 && data.hct > 47
                      ? '--abNormal' : 'normal'}`}>
                  <div className={`resultsLabel`}>Hct</div>
                  <div>
                    <span className={`resultsValue`}>{data.hct}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.cbc_wbc === '' || data.cbc_wbc === undefined
                  ? '--fail' : data.cbc_wbc < 5.0 || data.cbc_wbc > 10.0
                    ? '--abNormal' : 'normal'}`}>
                  <div className={`resultsLabel`}>WBC</div>
                  <div>
                    <span className={`resultsValue`}>{data.cbc_wbc}</span>
                    <span className={`resultsUnit`}>Cell/mm^3</span>
                  </div>
                </div>
                <div className={`resultsGroup ${data.pmn === '' || data.pmn === undefined
                  ? '--fail' : data.pmn < 40 || data.pmn > 75
                    ? '--abNormal' : 'normal'}`}>
                  <div className={`resultsLabel`}>Neutrophil</div>
                  <div>
                    <span className={`resultsValue`}>{data.pmn}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Lymphocyte</div>
                  <div>
                    <span className={`resultsValue`}>{data.lym}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Monocyte</div>
                  <div>
                    <span className={`resultsValue`}>{data.mono}</span>
                    <span className={`resultsUnit`}>%</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Eosinophil</div>
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
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>ความเป็นกรดด่าง (pH)</div>
                  <div>
                    <span className={`resultsValue`}>{data.ph}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>ความถ่วงจำเพาะ (Sp.gr.)</div>
                  <div>
                    <span className={`resultsValue`}>{data.spgr}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Albumin</div>
                  <div>
                    <span className={`resultsValue`}>{data.alm}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Sugar</div>
                  <div>
                    <span className={`resultsValue`}>{data.sugar}</span>
                    <span className={`resultsUnit`}></span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>เม็ดเลือดขาว (WBC)</div>
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
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>ระดับนาตาลในเลือด (FBS)</div>
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
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Cholesterol</div>
                  <div>
                    <span className={`resultsValue`}>{data.chlt}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Triglyceride</div>
                  <div>
                    <span className={`resultsValue`}>{data.trig}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>HDL</div>
                  <div>
                    <span className={`resultsValue`}>{data.hdl}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>LDL</div>
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
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>SGOT</div>
                  <div>
                    <span className={`resultsValue`}>{data.sgot}</span>
                    <span className={`resultsUnit`}>U/L</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>SGPT</div>
                  <div>
                    <span className={`resultsValue`}>{data.sgpt}</span>
                    <span className={`resultsUnit`}>U/L</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
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
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Creatinine</div>
                  <div>
                    <span className={`resultsValue`}>{data.creatinine}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>BUN</div>
                  <div>
                    <span className={`resultsValue`}>{data.bun}</span>
                    <span className={`resultsUnit`}>mg/dL</span>
                  </div>
                </div>
                <div className={`resultsGroup`}>
                  <div className={`resultsLabel`}>Uric</div>
                  <div>
                    <span className={`resultsValue`}>{data.uric}</span>
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
              <div className={`cardGroupHead`}>Calcium Score</div>
              <table className={`tableViewColon`}>
                <tbody>
                  <tr>
                    <td>Result</td>
                    <td>{data.calcium_score_result}</td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>{data.calcium_score_result}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>Conclusion</div>
              <div>
                {data.conclusion}
              </div>
            </div>
          </div>
        </div>
        <div className={`card`}>
          <div className={`cardContent --noMargin `}>
            <div className={`cardGroup`}>
              <div className={`cardGroupHead`}>Recommendation</div>
              <div>
                {data.recommendation}
              </div>
              {/* <ul className={`normal`}>
              <li>ออกกำลังกายอย่างต่อเนื่อง อย่างน้อยวันละ 30 นาที เป็นเวลา 3-5 วันต่อสัปดาห์</li>
              <li>หลีกเลี่ยงอาหารที่มีน้ำตาลสูง เช่น น้ำอัดลม ขนมหวาน และผลไม้หวานจัด</li>
              <li>พยายามควบคุมน้ำหนักให้อยู่ใยเกณฑ์มาตรฐาน</li>
              <li>ควรตรวจ Caloum Score เพิ่มเติม</li>
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