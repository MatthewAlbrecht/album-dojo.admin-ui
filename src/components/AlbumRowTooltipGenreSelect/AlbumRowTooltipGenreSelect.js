import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGenres } from 'state/actions/genres'
import { updateAlbum } from 'state/actions/albums'
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup'
import Btn from 'components/Btn/Btn'
import Box from 'components/Box/Box'

export default function AlbumRowTooltipGenreSelect({
  albumGenres = [],
  id,
  setVisible,
}) {
  const [activeGenres, setActiveGenres] = useState(albumGenres)
  const dispatch = useDispatch()
  const { genreOptions = [] } = useSelector(({ genres: { genreOptions } }) => ({
    genreOptions,
  }))
  const requestGenresCallback = useCallback(() => dispatch(getAllGenres()), [
    dispatch,
  ])

  useEffect(() => {
    if (!genreOptions.length) {
      requestGenresCallback()
    }
  }, [requestGenresCallback, genreOptions.length])

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
    dispatch(updateAlbum(id, { genres: activeGenres }, onUpdateSuccess))
  }

  const onUpdateSuccess = () => {
    setVisible(false)
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
