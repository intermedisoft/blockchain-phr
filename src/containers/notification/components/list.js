
import React from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { Link } from 'react-router-dom'

require('moment/locale/th')
const ListComponent = (props) => {
  const { data } = { ...props }
  if (data) {
    return (
      <List>
        <Link to={{
          pathname: `/notification/${data.permissionLogId}`,
          state: { data }
        }}>
          <ListItem
            primaryText={data.healthCareProviderData[0].healthCareProviderName}
            secondaryText={
              <p>
                <span>{moment(data.actionDateTime).format('LLL')}</span>
              </p>
            }
            rightIcon={<ActionInfo />}
            secondaryTextLines={1}
          />
        </Link>
        <Divider />
      </List>
    )
  } else {
    return null
  }

  // return (
  //   <div>
  //     <List>
  //       <Link to={{
  //         pathname: `/notification/1`,
  //         state: { data: {} }
  //       }}>

  //         <ListItem
  //           primaryText='Request permission'
  //           secondaryText={
  //             <p>
  //               <span>18/01/2017 09:45</span>
  //             </p>
  //           }
  //           rightIcon={<ActionInfo />}
  //           secondaryTextLines={1}
  //         />
  //       </Link>
  //       <Divider />
  //     </List>

  //     <List>
  //       {/* <Subheader>12/01/2017</Subheader> */}
  //       <Link to={{
  //         pathname: `/checkup`,
  //         state: { data: {} }
  //       }}>
  //         <ListItem
  //           primaryText='Checkup Summary'
  //           // rightIconButton={rightIconMenu}
  //           secondaryText={
  //             <p>
  //               <span>17/01/2017 15:10</span>
  //             </p>
  //           }
  //           rightIcon={<ActionInfo />}
  //           secondaryTextLines={1}
  //         />
  //       </Link>
  //       <Divider />
  //       {/* <ListItem
  //         primaryText='All mail'
  //         rightIconButton={rightIconMenu}
  //         secondaryText={
  //           <p>
  //             <span>Brendan Lim</span> --
  //         I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
  //       </p>
  //         }
  //         secondaryTextLines={2}
  //       />
  //       <Divider />
  //       <ListItem
  //         primaryText='All mail'
  //         rightIconButton={rightIconMenu}
  //         secondaryText={
  //           <p>
  //             <span>Brendan Lim</span> --
  //         I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
  //       </p>
  //         }
  //         secondaryTextLines={2}
  //       />
  //       <Divider /> */}
  //     </List>
  //   </div>
  // )
}

export default ListComponent
