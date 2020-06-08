import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  queryAchievements,
  onSearchUpdate,
  onSortUpdate,
  queryNextAchievements,
} from 'state/actions/achievements'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import AchievementRow from 'components/AchievementRow/AchievementRow'
import DataList from 'components/DataList/DataList'
import ListControls from 'components/ListControls/ListControls'
import Btn from 'components/Btn/Btn'
import Icon from 'components/Icon/Icon'
import AddAchievementModal from 'components/AddAchievementModal/AddAchievementModal'
import ModalContainer from 'components/ModalContainer/ModalContainer'

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
          <div className="display_flex flexJustifier_spaceBetween">
            <Box classes="bottom6">
              <Txt
                tag="h1"
                size="24"
                bold
                color="DefaultCopy"
                content="Achievements"
              />
            </Box>
            <Btn
              circle
              className="achievementsPage-addButton"
              onClick={() => setIsOpen(true)}
              content={<Icon type="Plus" classes="plus nudgeDown1 20" />}
            ></Btn>
            <ModalContainer
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
              afterOpenModal={() => console.log('HERE')}
            >
              <AddAchievementModal setIsOpen={setIsOpen}></AddAchievementModal>
            </ModalContainer>
          </div>
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
