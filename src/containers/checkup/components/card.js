
import React from 'react'
import moment from 'moment'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'

require('moment/locale/th')
// moment.locale('th')
const CardComponent = (props) => {
  const data = props.data
  const { dateTimeServe, healthCareProvider } = { ...data }
  return (
    <Card>
      {/* <CardMedia>
        <img src='http://astonusa.com/images/aston-top-2014.jpg' />
      </CardMedia> */}
      <CardTitle title={moment(dateTimeServe).format('LL')} subtitle={healthCareProvider.healthCareProviderName} />
    </Card>
  )
}

export default CardComponent
