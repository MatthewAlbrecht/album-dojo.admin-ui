import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryAchievements,
  onSearchUpdate,
  onSortUpdate,
  queryNextAchievements,
} from 'state/actions/achievements'
import { codeSortOptions } from 'config/sorts'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import AchievementRow from 'components/AchievementRow/AchievementRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import AddAchievementModal from 'components/AddAchievementModal/AddAchievementModal'
import ListHeader from 'components/ListHeader/ListHeader'

const Achievements = () => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const {
    achievements,
    searchTerm,
    sortValue,
    queryUpdated,
    totalCount,
    isInfiniteLoading,
    hasMore,
  } = useSelector(
    ({
      achievements: {
        achievements,
        searchTerm,
        sortValue,
        queryUpdated,
        totalCount,
        isInfiniteLoading,
        hasMore,
      },
    }) => ({
      achievements,
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
      dispatch(queryAchievements())
    }
  }

  const handleSortUpdate = e => {
    dispatch(onSortUpdate(e))
    dispatch(queryAchievements())
  }

  const handleSearchUpdate = e => {
    dispatch(onSearchUpdate(e))
  }

  const handleInfiniteLoad = () => {
    if (!achievements.length) {
      dispatch(queryAchievements())
    } else {
      dispatch(queryNextAchievements())
    }
  }

  return (
    <section className="achievementsPage">
      <Tier classes="underNav">
        <Container>
          <ListHeader
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            heading="Achievements"
            modal={
              <AddAchievementModal setIsOpen={setIsOpen}></AddAchievementModal>
            }
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
            {achievements.map(achievement => (
              <AchievementRow
                key={achievement.code}
                achievement={achievement}
              />
            ))}
          </DataList>
        </Box>
      </Tier>
    </section>
  )
}

export default Achievements
