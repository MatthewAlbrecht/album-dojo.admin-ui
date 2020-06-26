import React from 'react'
import { Link } from 'react-router-dom'
import Txt from 'components/Txt/Txt'

export default function PermissionRow({ permission }) {
  return (
    <li className="permissionRow">
      <Link
        to={`/permissions/${permission.id}`}
        className="display_flex flexAligner_center flexJustifier_spaceBetween height100"
      >
        <Txt
          className="permissionRow-name"
          tag="p"
          size="18"
          color="DefaultCopy"
          content={permission.name}
        />
      </Link>
    </li>
  )
}
