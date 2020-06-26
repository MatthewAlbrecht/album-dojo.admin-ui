import React from 'react'
import { Link } from 'react-router-dom'
import Txt from 'components/Txt/Txt'

export default function RoleRow({ role }) {
  return (
    <li className="roleRow">
      <Link
        to={`/roles/${role.id}`}
        className="display_flex flexAligner_center flexJustifier_spaceBetween height100"
      >
        <Txt
          className="roleRow-name"
          tag="p"
          size="18"
          color="DefaultCopy"
          content={role.name}
        />
      </Link>
    </li>
  )
}
