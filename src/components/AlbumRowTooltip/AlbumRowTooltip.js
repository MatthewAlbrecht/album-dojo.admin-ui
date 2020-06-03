import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { queryGenres } from 'state/actions/genres'
import cl from 'classnames'

import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup'
import Btn from 'components/Btn/Btn'
import Box from 'components/Box/Box'

const STATE_ENUM = {
  MENU: 'MENU',
  GENRE_SELECT: 'GENRE_SELECT',
  DUPLICATE_SELECT: 'DUPLICATE_SELECT',
}

export default function AlbumRowTooltip({ setVisible }) {
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
        return <AlbumRowTooltipGenreSelect setTooltipState={setTooltipState} />

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

const genreOptions = [
  { label: 'Country', value: '1' },
  { label: 'Pop', value: '2' },
  { label: 'Hip Hop', value: '3' },
  { label: 'Metal', value: '4' },
  { label: 'Folk', value: '5' },
  { label: 'Electronic', value: '6' },
  { label: 'Alternative', value: '7' },
  { label: 'Rock', value: '8' },
  { label: 'R&B', value: '9' },
  { label: 'Blues', value: '10' },
  { label: 'Classical', value: '11' },
  { label: 'Jazz', value: '12' },
  { label: 'Funk', value: '13' },
  { label: 'Bluegrass', value: '14' },
  { label: 'International', value: '15' },
  { label: 'Reggae', value: '16' },
]

const AlbumRowTooltipGenreSelect = ({ albumGenres = ['1', '4'] }) => {
  const [activeGenres, setActiveGenres] = useState(albumGenres)
  const dispatch = useDispatch()
  const { genres } = useSelector(({ genres: { genres } }) => ({ genres }))
  const requestGenresCallback = useCallback(dispatch(queryGenres()), [])

  useEffect(() => {
    if (genres.length) {
      requestGenresCallback()
    }
  }, [requestGenresCallback, genres.length])

  const isArrayEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false

    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) return false
    }

    return true
  }

  const handleCheckboxChange = ({ target: { value } }) => {
    let newActiveGenres = [...activeGenres]
    if (activeGenres.includes(value)) {
      const index = activeGenres.indexOf(value)
      newActiveGenres.splice(index, 1)
    } else {
      newActiveGenres.push(value)
      newActiveGenres.sort()
    }
    setActiveGenres(newActiveGenres)
  }

  const handleGenreSave = () => {
    console.log('Active Genres To Save ==='.toUpperCase(), activeGenres)
  }

  return (
    <div>
      <CheckboxGroup
        name="genres"
        options={genreOptions}
        defaultValue={[]}
        numOfCol={5}
        handleChange={handleCheckboxChange}
        value={activeGenres}
      ></CheckboxGroup>
      <Box classes="top1">
        <div className="albumRow-tooltipSubmitBtn">
          <Btn
            content="Submit"
            classes="small"
            disabled={isArrayEqual(activeGenres, albumGenres)}
            onClick={handleGenreSave}
          ></Btn>
        </div>
      </Box>
    </div>
  )
}

const AlbumRowTooltipDuplicateSelect = ({ setTooltipState }) => {
  return <h3>duplicate menu thing</h3>
}
