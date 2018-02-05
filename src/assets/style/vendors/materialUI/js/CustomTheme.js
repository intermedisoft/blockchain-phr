import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {Variable} from './index'

const MuiCustomTheme = () => getMuiTheme({
  fontFamily: Variable.font,
  palette: {
    pickerHeaderColor: Variable.colors.main,
    primary1Color: Variable.colors.main,
    textColor: Variable.colors.text
  },
  datePicker: {
    selectColor: Variable.colors.main
  }
})

export default MuiCustomTheme
