import React from 'react'
import { useDispatch } from 'react-redux'
import { setPrimaryDuplicate } from 'state/actions/albums'

const STATE_ENUM = {
  MENU: 'MENU',
  GENRE_SELECT: 'GENRE_SELECT',
}

export default function AlbumRowTooltipMenu({
  setTooltipState,
  setVisible,
  album,
}) {
  const dispatch = useDispatch()

  const handleDuplicateClick = () => {
    dispatch(setPrimaryDuplicate(album.id))
    setVisible(false)
  }

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
          onClick={handleDuplicateClick}
        >
          Select Duplicate
        </button>
      </li>
    </ul>
  )
}
