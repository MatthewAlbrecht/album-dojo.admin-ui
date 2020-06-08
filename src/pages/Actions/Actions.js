import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryActions,
  onSearchUpdate,
  onSortUpdate,
  queryNextActions,
} from 'state/actions/actions'
import { codeSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import ActionRow from 'components/ActionRow/ActionRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import AddActionModal from 'components/AddActionModal/AddActionModal'
import ListHeader from 'components/ListHeader/ListHeader'

const Actions = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
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
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Actions"
            modal={<AddActionModal setIsOpen={setIsOpen}></AddActionModal>}
          />
          <ListControls
            onSearchUpdate={handleSearchUpdate}
            onSortUpdate={handleSortUpdate}
            onFormSubmit={handleFormSubmit}
            searchDefault={searchTerm}
            sortOptions={codeSortOptions}
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
