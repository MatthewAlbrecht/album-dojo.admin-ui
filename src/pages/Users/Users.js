import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryUsers,
  onSearchUpdate,
  onSortUpdate,
  queryNextUsers,
} from 'state/actions/users'
import { userSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import UserRow from 'components/UserRow/UserRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import ListHeader from 'components/ListHeader/ListHeader'
import AddUserModal from 'components/AddUserModal/AddUserModal'

const Users = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const {
    users,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      users: {
        users,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      users,
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
      dispatch(queryUsers())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryUsers())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!users.length) {
      dispatch(queryUsers())
    } else {
      dispatch(queryNextUsers())
    }
  }

  return (
    <section className="usersPage">
      <Tier classes="underNav">
        <Container>
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Users"
            modal={<AddUserModal setIsOpen={setIsOpen}></AddUserModal>}
          />
          <ListControls
            onSearchUpdate={handleSearchUpdate}
            onSortUpdate={handleSortUpdate}
            onFormSubmit={handleFormSubmit}
            searchDefault={searchTerm}
            sortOptions={userSortOptions}
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
            {users.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Users
