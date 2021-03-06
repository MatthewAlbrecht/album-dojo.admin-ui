import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryAlbums,
  onSearchUpdate,
  onSortUpdate,
  queryNextAlbums,
} from 'state/actions/albums'
import { albumSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import DuplicateActions from 'components/DuplicateActions/DuplicateActions'
import AlbumRow from 'components/AlbumRow/AlbumRow'
import AddActionModal from 'components/AddActionModal/AddActionModal'
import ListHeader from 'components/ListHeader/ListHeader'

const Albums = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
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
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Albums"
            modal={<AddActionModal setIsOpen={setIsOpen}></AddActionModal>}
          />
          <ListControls
            onSearchUpdate={handleSearchUpdate}
            onSortUpdate={handleSortUpdate}
            onFormSubmit={handleFormSubmit}
            searchDefault={searchTerm}
            sortOptions={albumSortOptions}
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
