
import React from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
// import MobileTearSheet from '../../../MobileTearSheet'
require('moment/locale/th')
// moment.locale('th')

const iconButtonElement = (
  <IconButton
    touch
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

const ListComponent = (props) => {
  console.log('00')
  // const data = props.data
  // const { dateTimeServe, healthCareProvider } = { ...data }
  return (
    <div>
      <List>
        <Subheader>Today</Subheader>
        <ListItem
          primaryText='All mail'
          rightIconButton={rightIconMenu}
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </List>

      <List>
        <Subheader>12/01/2017</Subheader>
        <ListItem
          primaryText='All mail'
          rightIconButton={rightIconMenu}
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
        <ListItem
          primaryText='All mail'
          rightIconButton={rightIconMenu}
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
        <ListItem
          primaryText='All mail'
          rightIconButton={rightIconMenu}
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </List>
    </div>
  )
}

export default ListComponent
