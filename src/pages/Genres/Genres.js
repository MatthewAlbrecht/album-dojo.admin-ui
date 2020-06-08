import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryGenres,
  onSearchUpdate,
  onSortUpdate,
  queryNextGenres,
} from 'state/actions/genres'
import { nameSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import GenreRow from 'components/GenreRow/GenreRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import AddGenreModal from 'components/AddGenreModal/AddGenreModal'
import ListHeader from 'components/ListHeader/ListHeader'

const Genres = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const {
    genres,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      genres: {
        genres,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      genres,
      searchTerm,
      sortValue,
      queryUpdated,
      totalCount,
      isInfiniteLoading,
      hasMore,
    })
  )

  const handleFormSubmit = e => {
    e.preventDefault()
    if (queryUpdated) {
      dispatch(queryGenres())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryGenres())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!genres.length) {
      dispatch(queryGenres())
    } else {
      dispatch(queryNextGenres())
    }
  }

  return (
    <section className="genresPage">
      <Tier classes="underNav">
        <Container>
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Genres"
            modal={<AddGenreModal setIsOpen={setIsOpen}></AddGenreModal>}
          />
          <ListControls
            onSearchUpdate={handleSearchUpdate}
            onSortUpdate={handleSortUpdate}
            onFormSubmit={handleFormSubmit}
            searchDefault={searchTerm}
            sortOptions={nameSortOptions}
            sortDefault={sortValue}
          />
        </Container>
        <Box classes="top4">
          <Container>
            <Box classes="bottom2">
              <Txt tag="span" size="14" color="Grey" content="Total Results:" />
              <Box classes="left0_5 inlineBlock">
                <Txt
                  tag="span"
                  size="14"
                  color="DefaultCopy"
                  content={totalCount}
                />
              </Box>
            </Box>
          </Container>
          <DataList
            isInfiniteLoading={isInfiniteLoading}
            handleInfiniteLoad={handleInfiniteLoad}
            hasMore={hasMore}
          >
            {genres.map(genre => (
              <GenreRow key={genre.id} genre={genre} />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Genres
