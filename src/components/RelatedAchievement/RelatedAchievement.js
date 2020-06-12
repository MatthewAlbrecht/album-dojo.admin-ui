import React from 'react'
import { Link } from 'react-router-dom'

import Txt from 'components/Txt/Txt'
import Box from 'components/Box/Box'
import Hr from 'components/Hr/Hr'
import HList from 'components/HList/HList'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'

export default function RelatedAchievement({ achievement }) {
  return (
    <Link
      className="relatedAchievement"
      to={`/achievements/${achievement.code}`}
    >
      <div className="display_flex flexAligner_center flexJustifier_flexStart">
        <Box classes="right2 inlineBlock">
          <div className="relatedAchievement-image"></div>
        </Box>
        <div className="relatedAchievement-headerContent">
          <Txt
            tag="span"
            size="12"
            color="Grey"
            content={achievement.code}
            uppercase
            semibold
            space="1"
          />
          <Box classes="top0_5">
            <Txt
              className="relatedAchievement-name"
              tag="h3"
              size="20"
              color="DefaultCopy"
              content={achievement.name}
            />
          </Box>
        </div>
      </div>
      <Box classes="flats2">
        <Hr color="GreyLightest"></Hr>
      </Box>
      <HList classes="3">
        <KeyValueItem property="Description" value={achievement.description} />
      </HList>
    </Link>
  )
}
