import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { patientAction } from './../../redux/actions/patient'

class ProfilePage extends Component {
  componentWillMount() {
    this.props.getPatient()
  }

  render() {
    const { patients } = { ...this.props }
    if (patients.length) {
      const patient = patients[0]
      return (
        <div className='containerMain'>
          <div className='menuIconList'>
            <div>
              <button>Edit</button>
            </div>
            <div>Prename: <span>{patient.prename}</span></div>
            <div>Name: <span>{patient.name}</span></div>
            <div>Surname: <span>{patient.surname}</span></div>
            <div>DOB: <span>{patient.dob}</span></div>
            <div>BLOOD: <span>{patient.bloodGroup}</span></div>
            <div>SEX: <span>{patient.sex}</span></div>
            <div>MARRIAGE: <span>{patient.marriage}</span></div>
            <div>NATION: <span>{patient.nation}</span></div>
            <div>RACE: <span>{patient.race}</span></div>
            <div>OCCUPATION: <span>{patient.occupation}</span></div>
            <div>HEIGHT: <span>{patient.height}</span></div>
            <div>WEIGHT: <span>{patient.weight}</span></div>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: () => {
      dispatch(patientAction.getPatient())
    }
  }
}

const mapStateToProps = state => (
  {
    patients: state.patient.data
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
