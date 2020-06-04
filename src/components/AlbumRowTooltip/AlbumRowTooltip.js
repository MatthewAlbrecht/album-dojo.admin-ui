import React, { useEffect, useRef, useState } from 'react'
import cl from 'classnames'

import AlbumRowTooltipGenreSelect from 'components/AlbumRowTooltipGenreSelect/AlbumRowTooltipGenreSelect'

const STATE_ENUM = {
  MENU: 'MENU',
  GENRE_SELECT: 'GENRE_SELECT',
  DUPLICATE_SELECT: 'DUPLICATE_SELECT',
}

export default function AlbumRowTooltip({ setVisible, album }) {
  const node = useRef()
  const [tooltipState, setTooltipState] = useState(STATE_ENUM.MENU)
  const handleClick = ({ target }) => {
    if (node.current.contains(target)) {
      return
    }
    setVisible(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })

  const renderTooltip = () => {
    switch (tooltipState) {
      case STATE_ENUM.MENU:
        return <AlbumRowTooltipMenu setTooltipState={setTooltipState} />
      case STATE_ENUM.DUPLICATE_SELECT:
        return (
          <AlbumRowTooltipDuplicateSelect setTooltipState={setTooltipState} />
        )
      case STATE_ENUM.GENRE_SELECT:
        return (
          <AlbumRowTooltipGenreSelect
            setTooltipState={setTooltipState}
            albumGenres={album.genres && album.genres.map(genre => genre.id)}
            setVisible={setVisible}
            id={album.id}
          />
        )

      default:
        break
    }
  }

  const tooltipClasses = cl([
    'albumRow-tooltip',
    tooltipState === STATE_ENUM.MENU && 'albumRow-tooltip_menuActive',
    tooltipState === STATE_ENUM.DUPLICATE_SELECT &&
      'albumRow-tooltip_duplicateActive',
    tooltipState === STATE_ENUM.GENRE_SELECT && 'albumRow-tooltip_genreActive',
  ])

  return (
    <div ref={node} className={tooltipClasses} onClick={handleClick}>
      {renderTooltip()}
    </div>
  )
}

const AlbumRowTooltipMenu = ({ setTooltipState }) => {
  return (
    <ul>
      <li>
        <button
          className="albumRow-tooltipItem txt txt_14 txt_colorDefaultCopy"
          onClick={() => {
            setTooltipState(STATE_ENUM.GENRE_SELECT)
          }}
        >
          Update Genres
        </button>
        <button
          className="albumRow-tooltipItem txt txt_14 txt_colorDefaultCopy"
          onClick={() => {
            setTooltipState(STATE_ENUM.DUPLICATE_SELECT)
          }}
        >
          Select Duplicate
        </button>
      </li>
    </ul>
  )
}

const AlbumRowTooltipDuplicateSelect = ({ setTooltipState }) => {
  return <h3>duplicate menu thing</h3>
}
