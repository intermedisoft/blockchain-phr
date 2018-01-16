import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = () => {
  let overwrites = {
    "fontFamily": 'boon, Arial, Helvetica, sans-serif',
    "palette": {
        "primary1Color": "#ff5722"
    }
};
  return getMuiTheme(baseTheme, overwrites);
}