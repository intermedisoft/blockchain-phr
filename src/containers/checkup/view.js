import React, { Component } from 'react'
class CheckupViewerPage extends Component {
  state = {
    data: ''
  }

  componentWillMount() {
    console.log(this.props.location.state)
    if (this.props.location.state === undefined) {
      this.props.history.push('/checkup')
      return false
    }
    this.setState({
      data: this.props.location.state.data
    })
  }

  render() {
    const id = this.props.match.params.id
    const data = this.state.data
    return (
      <div className='containerMain'>
        <div className='card'>
          {id}
        </div>
      </div>
    )
  }
}

export default CheckupViewerPage