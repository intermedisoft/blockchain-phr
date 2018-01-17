
import React from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
// import MobileTearSheet from '../../../MobileTearSheet'
require('moment/locale/th')
// moment.locale('th')
const ListComponent = (props) => {
  // const data = props.data
  // const { dateTimeServe, healthCareProvider } = { ...data }
  return (
    <div>
      <List>
        <Subheader>Today</Subheader>
        <ListItem
          primaryText='All mail'
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
      </List>
      <List>
        <Subheader>12/01/2017</Subheader>
        <ListItem
          primaryText='All mail'
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          primaryText='All mail'
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
        <ListItem
          primaryText='All mail'
          secondaryText={
            <p>
              <span>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
        </p>
          }
          secondaryTextLines={2}
        />
      </List>
    </div>
  )
}

export default ListComponent
