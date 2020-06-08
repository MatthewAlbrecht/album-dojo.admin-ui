import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryRoles,
  onSearchUpdate,
  onSortUpdate,
  queryNextRoles,
} from 'state/actions/roles'
import { nameSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import RoleRow from 'components/RoleRow/RoleRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import AddRoleModal from 'components/AddRoleModal/AddRoleModal'
import ListHeader from 'components/ListHeader/ListHeader'

const Roles = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const {
    roles,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      roles: {
        roles,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      roles,
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
      dispatch(queryRoles())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryRoles())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!roles.length) {
      dispatch(queryRoles())
    } else {
      dispatch(queryNextRoles())
    }
  }

  return (
    <section className="rolesPage">
      <Tier classes="underNav">
        <Container>
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Roles"
            modal={<AddRoleModal setIsOpen={setIsOpen}></AddRoleModal>}
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
            {roles.map(role => (
              <RoleRow key={role.id} role={role} />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Roles
