import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEmpty } from 'react-redux-firebase'
import { patientAction } from './../../redux/actions/patient'
import { Link } from 'react-router-dom'

class ProfilePage extends Component {
  // componentWillMount() {
  //   this.props.getPatient()
  // }

  render() {
    const { patientId, patients, configs, err } = { ...this.props }
    if (isEmpty(patients) && !err) {
      this.props.getPatient(configs, patientId)
      return true
    }

    let renderHTML = (
      <div> Loading... </div>
    )
    if (!isEmpty(patients)) {
      renderHTML = (
        <div>
          <div>
            <Link to='/profile/edit'> <button>Edit</button></Link>
          </div>
          <div>Prename: <span>{patients.prename}</span></div>
          <div>Name: <span>{patients.name}</span></div>
          <div>Surname: <span>{patients.surname}</span></div>
          <div>DOB: <span>{moment(patients.dob).format('L')}</span></div>
          <div>BLOOD: <span>{patients.bloodGroup}</span></div>
          <div>SEX: <span>{patients.sex}</span></div>
          <div>MARRIAGE: <span>{patients.marriage}</span></div>
          <div>NATION: <span>{patients.nation}</span></div>
          <div>RACE: <span>{patients.race}</span></div>
          <div>OCCUPATION: <span>{patients.occupation}</span></div>
          <div>HEIGHT: <span>{patients.height}</span></div>
          <div>WEIGHT: <span>{patients.weight}</span></div>
        </div>
      )
    }
    return (
      <div className='containerMain'>
        <div className='card'>
          {renderHTML}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    getPatient: (configs, patientId) => {
      dispatch(patientAction.getPatient(configs, patientId))
    }
  }
}

const mapStateToProps = state => (
  {
    patientId: state.firebase.profile.patientId,
    patients: state.patient.data,
    configs: state.firebase.data.configs,
    err: state.fetchError.modalOpen
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
