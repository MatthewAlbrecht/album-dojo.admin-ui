import React from 'react'
import { Link } from 'react-router-dom'

import Txt from 'components/Txt/Txt'
import Box from 'components/Box/Box'
import Hr from 'components/Hr/Hr'
import HList from 'components/HList/HList'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'

export default function RelatedAction({ action }) {
  return (
    <Link className="relatedAction" to={`/actions/${action.code}`}>
      <div className="display_flex flexAligner_center flexJustifier_flexStart">
        <div className="relatedAction-headerContent">
          <Txt
            tag="span"
            size="12"
            color="Grey"
            content={action.code}
            uppercase
            semibold
            space="1"
          />
          <Box classes="top0_5">
            <Txt
              className="relatedAction-name"
              tag="h3"
              size="20"
              color="DefaultCopy"
              content={action.name}
            />
          </Box>
        </div>
      </div>
      <Box classes="flats2">
        <Hr color="GreyLightest"></Hr>
      </Box>
      <HList classes="3">
        <KeyValueItem property="Points" value={action.points} />
        <KeyValueItem property="Description" value={action.description} />
      </HList>
    </Link>
  )
}
