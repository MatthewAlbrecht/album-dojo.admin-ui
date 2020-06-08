import React from 'react'

import Txt from 'components/Txt/Txt'

export default function ActionRow({ action }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="actionRow" onClick={handleRowClick}>
      <Txt
        className="actionRow-name"
        tag="h4"
        size="18"
        color="DefaultCopy"
        content={action.name}
      />
      <Txt
        className="actionRow-code"
        tag="span"
        size="16"
        color="Grey"
        content={action.code}
      />
    </li>
  )
}
