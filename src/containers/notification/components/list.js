
import React, { Component } from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { Link } from 'react-router-dom'
import {, blue500} from 'material-ui/styles/colors';

require('moment/locale/th')

class ListComponent extends Component {
  render() {
    const { val } = { ...this.props }
    const data = val.item
    const iconList = (<ActionInfo color={blue500}/>)
        
    if (data) {
      return (
        <List>
          <Link to={{
            pathname: val.type === 'CheckupHistory'
              ? `/checkup/read/${val.id}` : `/notification/${val.id}`,
            state: { data }
          }}>
            <ListItem
              primaryText={val.typeText}
              secondaryText={
                <p>
                  <span>{data.healthCareProviderData[0].healthCareProviderName}</span>
                  <br />
                  <span>{moment(val.actionDateTime).format('LLL')}</span>
                </p>
              }
              rightIcon={
                val.type === 'CheckupHistory'
                  ? data.checkupHistory.patientAcknowledgeDateTime ? null : iconList
                  : data.patientAcknowledgeDateTime ? null : iconList
              }
              secondaryTextLines={2}
            />
          </Link>
          <Divider />
        </List >
      )
    } else {
      return null
    }
  }
}
export default ListComponent
