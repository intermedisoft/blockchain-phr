import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const ListComponent = (props) => {
  const data = props.data
  const { healthCareProviderName } = { ...data }

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
