import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryPermissions,
  onSearchUpdate,
  onSortUpdate,
  queryNextPermissions,
} from 'state/actions/permissions'
import { nameSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import PermissionRow from 'components/PermissionRow/PermissionRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import ListHeader from 'components/ListHeader/ListHeader'
import AddPermissionModal from 'components/AddPermissionModal/AddPermissionModal'

const Permissions = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const {
    permissions,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      permissions: {
        permissions,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      permissions,
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
      dispatch(queryPermissions())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryPermissions())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!permissions.length) {
      dispatch(queryPermissions())
    } else {
      dispatch(queryNextPermissions())
    }
  }

  return (
    <section className="permissionsPage">
      <Tier classes="underNav">
        <Container>
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Permissions"
            modal={
              <AddPermissionModal setIsOpen={setIsOpen}></AddPermissionModal>
            }
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
            {permissions.map(permission => (
              <PermissionRow key={permission.id} permission={permission} />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Permissions
