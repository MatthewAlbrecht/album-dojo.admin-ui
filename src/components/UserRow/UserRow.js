import React from 'react'

import Txt from 'components/Txt/Txt'

export default function UserRow({ user }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="userRow" onClick={handleRowClick}>
      <Txt
        className="userRow-email"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={user.email}
      />
      {user.username && (
        <Txt
          className="userRow-username"
          tag="span"
          size="16"
          color="Grey"
          content={user.username}
        />
      )}
    </li>
  )
}
