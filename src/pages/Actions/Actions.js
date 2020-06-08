import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryActions,
  onSearchUpdate,
  onSortUpdate,
  queryNextActions,
} from 'state/actions/actions'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import ActionRow from 'components/ActionRow/ActionRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'

const Actions = () => {
  const dispatch = useDispatch()
  const {
    actions,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      actions: {
        actions,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      actions,
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
    { label: 'Code: A to Z', value: 'code:ASC' },
    { label: 'Code: Z to A', value: 'code:DESC' },
    { label: 'Last Updated: New to Old', value: 'updatedAt:DESC' },
    { label: 'Last Updated: Old to New', value: 'updatedAt:ASC' },
  ]

  const handleFormSubmit = e => {
    e.preventDefault()
    if (queryUpdated) {
      dispatch(queryActions())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryActions())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!actions.length) {
      dispatch(queryActions())
    } else {
      dispatch(queryNextActions())
    }
  }

  return (
    <section className="actionsPage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom6">
            <Txt
              tag="h1"
              size="24"
              bold
              color="DefaultCopy"
              content="Actions"
            />
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
            {actions.map(action => (
              <ActionRow key={action.code} action={action} />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Actions
