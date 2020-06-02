import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryAlbums,
  onSearchUpdate,
  onSortUpdate,
  queryNextAlbums,
} from 'actions/albums'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import AlbumList from 'components/AlbumList/AlbumList'
import ListControls from 'components/ListControls/ListControls'

const Albums = () => {
  const dispatch = useDispatch()
  const {
    albums,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      albums: {
        albums,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      albums,
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
    { label: 'Release Date: New to Old', value: 'releaseDate:DESC' },
    { label: 'Release Date: Old to New', value: 'releaseDate:ASC' },
    { label: 'Total Tracks: Most to Fewest', value: 'totalTracks:DESC' },
    { label: 'Total Tracks: Fewest to Most', value: 'totalTracks:ASC' },
    { label: 'Album Length: Longest to Shortest', value: 'durationInMs:DESC' },
    { label: 'Album Length: Shortest to Longest', value: 'durationInMs:ASC' },
    { label: 'Last Updated: New to Old', value: 'updatedAt:DESC' },
    { label: 'Last Updated: Old to New', value: 'updatedAt:ASC' },
  ]

  const handleFormSubmit = e => {
    e.preventDefault()
    if (queryUpdated) {
      dispatch(queryAlbums())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryAlbums())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!albums.length) {
      dispatch(queryAlbums())
    } else {
      dispatch(queryNextAlbums())
    }
  }

  return (
    <>
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom6">
            <Txt tag="h1" size="24" bold color="DefaultCopy" content="Albums" />
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
          <AlbumList
            albums={albums}
            isInfiniteLoading={isInfiniteLoading}
            handleInfiniteLoad={handleInfiniteLoad}
            hasMore={hasMore}
          />
        </Box>
      </Tier>
    </>
  )
}

export default Albums
