import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findAction, resetAction } from 'state/actions/actions'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Spinner from 'components/Spinner/Spinner'
import CodeNameHeader from 'components/CodeNameHeader/CodeNameHeader'
import Btn from 'components/Btn/Btn'
import HList from 'components/HList/HList'
import VList from 'components/VList/VList'
import ModalContainer from 'components/ModalContainer/ModalContainer'
import AddActionModal from 'components/AddActionModal/AddActionModal'
import ItemSection from 'components/ItemSection/ItemSection'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'
import SimilarActions from 'components/SimilarActions/SimilarActions'
import RelatedAchievement from 'components/RelatedAchievement/RelatedAchievement'

const Actions = ({
  match: {
    params: { code },
  },
}) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const requestActionCallback = useCallback(() => dispatch(findAction(code)), [
    dispatch,
    code,
  ])
  const resetActionCallback = useCallback(() => dispatch(resetAction()), [
    dispatch,
  ])

  useEffect(() => {
    requestActionCallback()
    return () => resetActionCallback()
  }, [requestActionCallback, resetActionCallback])
  const { action } = useSelector(({ actions: { action } }) => ({
    action,
  }))

  const handleEditClick = () => {
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleDuplicateClick = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  if (action && !Object.keys(action).length) return <Spinner></Spinner>
  return (
    <section className="actionPage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom3">
            <CodeNameHeader
              name={action.name}
              code={action.code}
              type="Action"
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
            <ItemSection heading="Action Details">
              <HList classes="3">
                <KeyValueItem property="Points" value={action.points} />
                <KeyValueItem property="Level" value={action.level} />
                <KeyValueItem
                  property="Description"
                  value={action.description}
                />
              </HList>
            </ItemSection>
            <ItemSection heading="Similar Actions">
              <SimilarActions actions={action.relatedActions} />
            </ItemSection>
            {action.achievement && (
              <ItemSection heading="Related Achievement">
                <RelatedAchievement achievement={action.achievement} />
              </ItemSection>
            )}
          </VList>
        </Container>
      </Tier>
      <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddActionModal
          isEdit={isEdit}
          defaultValues={action}
          setIsOpen={setIsOpen}
        ></AddActionModal>
      </ModalContainer>
    </section>
  )
}

export default Actions
