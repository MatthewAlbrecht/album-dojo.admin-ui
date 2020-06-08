import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryGenres,
  onSearchUpdate,
  onSortUpdate,
  queryNextGenres,
} from 'state/actions/genres'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import GenreRow from 'components/GenreRow/GenreRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'

const Genres = () => {
  const dispatch = useDispatch()
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

  const sortOptions = [
    { label: 'Date Added: New to Old', value: 'createdAt:DESC' },
    { label: 'Date Added: Old to New', value: 'createdAt:ASC' },
    { label: 'Name: A to Z', value: 'name:ASC' },
    { label: 'Name: Z to A', value: 'name:DESC' },
    { label: 'Last Updated: New to Old', value: 'updatedAt:DESC' },
    { label: 'Last Updated: Old to New', value: 'updatedAt:ASC' },
  ]

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
          <Box classes="bottom6">
            <Txt tag="h1" size="24" bold color="DefaultCopy" content="Genres" />
          </Box>
          <ListControls
            onSearchUpdate={handleSearchUpdate}
            onSortUpdate={handleSortUpdate}
            onFormSubmit={handleFormSubmit}
            searchDefault={searchTerm}
            sortOptions={sortOptions}
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
