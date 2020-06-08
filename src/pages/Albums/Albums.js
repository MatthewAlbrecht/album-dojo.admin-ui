import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryAlbums,
  onSearchUpdate,
  onSortUpdate,
  queryNextAlbums,
} from 'state/actions/albums'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import DuplicateActions from 'components/DuplicateActions/DuplicateActions'
import AlbumRow from 'components/AlbumRow/AlbumRow'

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
    primaryDuplicate,
    duplicates,
    updateAlbumLoading,
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
        primaryDuplicate,
        duplicates,
        updateAlbumLoading,
      },
    }) => ({
      albums,
      searchTerm,
      sortValue,
      queryUpdated,
      totalCount,
      isInfiniteLoading,
      hasMore,
      primaryDuplicate,
      duplicates,
      updateAlbumLoading,
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
    <section className="albumsPage">
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
          <DataList
            isInfiniteLoading={isInfiniteLoading}
            handleInfiniteLoad={handleInfiniteLoad}
            hasMore={hasMore}
          >
            {albums.map(album => (
              <AlbumRow
                key={album.id}
                album={album}
                primaryDuplicate={primaryDuplicate}
                duplicates={duplicates}
              />
            ))}
          </DataList>
        </Box>
        {primaryDuplicate && (
          <DuplicateActions
            updateAlbumLoading={updateAlbumLoading}
            primaryDuplicate={primaryDuplicate}
            duplicates={duplicates}
          />
        )}
      </Tier>
    </section>
  )
}

export default Albums
