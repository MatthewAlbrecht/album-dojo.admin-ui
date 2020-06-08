import React from 'react'

import Txt from 'components/Txt/Txt'

export default function PermissionRow({ permission }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="permissionRow" onClick={handleRowClick}>
      <Txt
        className="permissionRow-name"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={permission.name}
      />
    </li>
  )
}
