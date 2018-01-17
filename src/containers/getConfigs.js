import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { compose, lifecycle, pure } from 'recompose'

// import { conf } from './../config'
const GetConfig = ({ configs }) => {
  // conf.BASE_API_URL = configs ? configs.rest_ulr : ''
  // console.log('************')
  // console.log(conf)
  // console.log('************')
  return null
}

GetConfig.propTypes = {
  configs: PropTypes.object
}

// Create enhancer by composing HOCs
const enhance = compose(
  withFirebase, // add props.firebase
  lifecycle({
    componentWillMount() {
      this.props.firebase.watchEvent('value', 'configs')
    }
    // ,
    // componentWillUnmount () {
    //   this.props.firebase.unWatchEvent('value', 'configs')
    // }
  }),
  connect(({ firebase: { data: { configs } } }) => ({
    configs
  })),
  pure
)

export default enhance(GetConfig)
