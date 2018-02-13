import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import moment from 'moment'
require('moment/locale/th')

const ListComponent = (props) => {
  const data = props.data
  const { patientId, healthCareProviderName } = { ...data }

  return (
    <div>
      <ListItem
        primaryText={healthCareProviderName}
        secondaryTextLines={1}
      />
      <Divider />
    </div>

  )
}

export default ListComponent
