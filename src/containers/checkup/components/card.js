
import React from 'react'
import moment from 'moment'
import { Card, CardTitle } from 'material-ui/Card'

require('moment/locale/th')
const CardComponent = (props) => {
  const data = props.data
  const { dateTimeServe, healthCareProvider } = { ...data }
  return (
    <Card>
      <CardTitle title={moment(dateTimeServe).format('LL')} subtitle={healthCareProvider.healthCareProviderName} />
    </Card>
  )
}

export default CardComponent
