import React from 'react'

import Txt from 'components/Txt/Txt'
import Box from 'components/Box/Box'

export default function KeyValueItem({ property, value }) {
  return (
    <div className="keyValueItem">
      <Txt tag="h3" size="12" color="Grey" content={property} />
      <Box classes="top1">
        <Txt tag="p" size="16" color="DefaultCopy" semibold content={value} />
      </Box>
    </div>
  )
}
