import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const ListComponent = (props) => {
  const data = props.data
  const handleClick = props.handleClick
  const { healthCareProviderName } = { ...data }

  return (
    <div>
      <ListItem
        primaryText={healthCareProviderName}
        secondaryTextLines={1}
        onClick={handleClick}
      />
      <Divider />
    </div>

  )
}

export default ListComponent
