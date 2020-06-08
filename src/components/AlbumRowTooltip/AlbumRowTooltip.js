import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import AlbumRowTooltipMenu from 'components/AlbumRowTooltipMenu/AlbumRowTooltipMenu'
import AlbumRowTooltipGenreSelect from 'components/AlbumRowTooltipGenreSelect/AlbumRowTooltipGenreSelect'

const STATE_ENUM = {
  MENU: 'MENU',
  GENRE_SELECT: 'GENRE_SELECT',
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
        return (
          <AlbumRowTooltipMenu
            setTooltipState={setTooltipState}
            setVisible={setVisible}
            album={album}
          />
        )
      case STATE_ENUM.DUPLICATE_SELECT:
        break
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

  const tooltipClasses = cn([
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
