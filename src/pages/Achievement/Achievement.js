import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findAchievement, resetAchievement } from 'state/actions/achievements'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Spinner from 'components/Spinner/Spinner'
import CodeNameHeader from 'components/CodeNameHeader/CodeNameHeader'
import Btn from 'components/Btn/Btn'
import HList from 'components/HList/HList'
import VList from 'components/VList/VList'
import ModalContainer from 'components/ModalContainer/ModalContainer'
import RelatedAction from 'components/RelatedAction/RelatedAction'
import AddAchievementModal from 'components/AddAchievementModal/AddAchievementModal'
import ItemSection from 'components/ItemSection/ItemSection'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'
import SimilarAchievements from 'components/SimilarAchievements/SimilarAchievements'

const Achievements = ({
  match: {
    params: { code },
  },
}) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const requestAchievementCallback = useCallback(
    () => dispatch(findAchievement(code)),
    [dispatch, code]
  )
  const resetAchievementCallback = useCallback(
    () => dispatch(resetAchievement()),
    [dispatch]
  )

  useEffect(() => {
    requestAchievementCallback()
    return () => resetAchievementCallback()
  }, [requestAchievementCallback, resetAchievementCallback])
  const { achievement } = useSelector(({ achievements: { achievement } }) => ({
    achievement,
  }))

  const handleEditClick = () => {
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleDuplicateClick = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  if (!Object.keys(achievement).length) return <Spinner></Spinner>
  return (
    <section className="achievementPage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom3">
            <CodeNameHeader
              name={achievement.name}
              code={achievement.code}
              type="Achievement"
              image
            />
          </Box>
          <Box classes="bottom5">
            <div className="display_flex flexJustifier_flexStart">
              <HList classes="2">
                <Btn
                  small
                  tertiary
                  content="Edit"
                  onClick={handleEditClick}
                ></Btn>
                <Btn
                  small
                  tertiary
                  content="Duplicate"
                  onClick={handleDuplicateClick}
                ></Btn>
              </HList>
            </div>
          </Box>
          <VList classes="5">
            <ItemSection heading="Achievement Details">
              <HList classes="3">
                <KeyValueItem property="Level" value={achievement.level} />
                <KeyValueItem
                  property="Description"
                  value={achievement.description}
                />
              </HList>
            </ItemSection>
            <ItemSection heading="Similar Achievements">
              <SimilarAchievements
                achievements={achievement.relatedAchievements}
              />
            </ItemSection>
            {achievement.relatedAction && (
              <ItemSection heading="Related Action">
                <RelatedAction action={achievement.relatedAction} />
              </ItemSection>
            )}
          </VList>
        </Container>
      </Tier>
      <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddAchievementModal
          isEdit={isEdit}
          defaultValues={achievement}
          setIsOpen={setIsOpen}
        ></AddAchievementModal>
      </ModalContainer>
    </section>
  )
}

export default Achievements
