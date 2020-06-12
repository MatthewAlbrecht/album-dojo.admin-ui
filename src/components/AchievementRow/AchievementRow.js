import React from 'react'
import { Link } from 'react-router-dom'
import Txt from 'components/Txt/Txt'

export default function AchievementRow({ achievement }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="achievementRow" onClick={handleRowClick}>
      <Link
        to={`/achievements/${achievement.code}`}
        className="display_flex flexAligner_center flexJustifier_spaceBetween height100"
      >
        <Txt
          className="achievementRow-name"
          tag="p"
          size="18"
          color="DefaultCopy"
          content={achievement.name}
        />
        <Txt
          className="achievementRow-code"
          tag="p"
          size="16"
          color="Grey"
          content={achievement.code}
        />
      </Link>
    </li>
  )
}
