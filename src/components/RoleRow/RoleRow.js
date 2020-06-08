import React from 'react'

import Txt from 'components/Txt/Txt'

export default function RoleRow({ role }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="roleRow" onClick={handleRowClick}>
      <Txt
        className="roleRow-name"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={role.name}
      />
    </li>
  )
}
