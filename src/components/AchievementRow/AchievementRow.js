import React from 'react'

import Txt from 'components/Txt/Txt'

export default function AchievementRow({ achievement }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="achievementRow" onClick={handleRowClick}>
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
    </li>
  )
}
