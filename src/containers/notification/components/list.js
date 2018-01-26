
import React, { Component } from 'react'
import moment from 'moment'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { Link } from 'react-router-dom'

require('moment/locale/th')

class ListComponent extends Component {
  render() {
    const { data } = { ...this.props }
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
              rightIcon={
                data.patientAcknowledgeDateTime ? null : <ActionInfo />
              }
              secondaryTextLines={1}
            />
          </Link>
          <Divider />
        </List>
      )
    } else {
      return null
    }
  }
}
export default ListComponent
