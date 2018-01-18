import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import moment from 'moment'

require('moment/locale/th')
const CardComponent = (props) => {
  const data = props.data
  const { dateTimeServe, healthCareProvider } = { ...data }
  return (
    <div>
      <ListItem
        primaryText={moment(dateTimeServe).format('LL')}
        secondaryText={healthCareProvider.healthCareProviderName}
        secondaryTextLines={2}
      />
      <Divider />
    </div>

  )
}

export default CardComponent
