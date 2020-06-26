import React from 'react'
import { Link } from 'react-router-dom'

import Txt from 'components/Txt/Txt'

export default function GenreRow({ genre }) {
  return (
    <li className="genreRow">
      <Link
        to={`/genres/${genre.id}`}
        className="display_flex flexAligner_center flexJustifier_spaceBetween height100"
      >
        <Txt
          className="genreRow-code"
          tag="p"
          size="18"
          color="DefaultCopy"
          content={genre.name}
        />
      </Link>
    </li>
  )
}
