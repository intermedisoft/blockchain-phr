import React from 'react'
import { ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import ActionInfo from 'material-ui/svg-icons/action/info'
import { Variable } from '../../../assets/style/vendors/materialUI/js/index'
require('moment/locale/th')

const ListComponent = (props) => {
  const data = props.data
  const { dateTimeServe, healthCareProviderData } = { ...data }
  return (
    <div>
      <ListItem
        primaryText={moment(dateTimeServe).format('LL')}
        secondaryText={healthCareProviderData[0].healthCareProviderName}
        rightIcon={
          data.patientAcknowledgeDateTime
            ? null : <ActionInfo color={Variable.colors.notifi} />
        }

      />
      <Divider />
    </div>

  )
}

export default ListComponent
