import React from 'react'

import Txt from 'components/Txt/Txt'

export default function GenreRow({ genre }) {
  const handleRowClick = () => {
    console.log('HERE')
  }

  return (
    <li className="genreRow" onClick={handleRowClick}>
      <Txt
        className="genreRow-code"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={genre.name}
      />
    </li>
  )
}
