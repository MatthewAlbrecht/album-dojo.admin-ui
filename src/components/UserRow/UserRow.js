import React from 'react'

import Txt from 'components/Txt/Txt'

export default function UserRow({ user }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="userRow" onClick={handleRowClick}>
      <Txt
        className="userRow-code"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={user.email}
      />
    </li>
  )
}
