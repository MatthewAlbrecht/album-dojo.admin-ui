import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllGenres, createGenre } from 'state/actions/genres'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddGenreModal({ setIsOpen }) {
  const dispatch = useDispatch()
  const { genreOptions, createGenreLoading } = useSelector(
    ({ genres: { genreOptions }, actions: { createGenreLoading } }) => ({
      genreOptions,
      createGenreLoading,
    })
  )
  const requestGenresCallback = useCallback(() => dispatch(getAllGenres()), [
    dispatch,
  ])

  useEffect(() => {
    if (!genreOptions.length) {
      requestGenresCallback()
    }
  }, [requestGenresCallback, genreOptions.length])
  function handleAddGenreSubmit(e) {
    e.preventDefault()
    const genre = {
      name: e.target.name.value,
      parentGenreId: e.target.parentGenreId.value || null,
    }
    dispatch(createGenre(genre, () => setIsOpen(false)))
  }

  return (
    <div className="addGenre">
      <Txt tag="h2" size="20" color="DefaultCopy" content="Create New Genre" />
      <Box classes="top3">
        <form
          onSubmit={handleAddGenreSubmit}
          id="addGenre-form"
          className="addGenre-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput name="name" label="Name" id="genre-name" required />
            <SelectDropdown
              name="parentGenreId"
              label="Parent Genre"
              id="genre-parentGenreId"
              options={[{ label: 'None', value: '' }, ...genreOptions]}
              fullWidth
            ></SelectDropdown>
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addGenre-form"
                content="Submit"
                loading={createGenreLoading}
                disabled={createGenreLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
