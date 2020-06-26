import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findRole, resetRole } from 'state/actions/roles'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Spinner from 'components/Spinner/Spinner'
import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'
import HList from 'components/HList/HList'
import VList from 'components/VList/VList'
import Hr from 'components/Hr/Hr'
import ModalContainer from 'components/ModalContainer/ModalContainer'
import AddRoleModal from 'components/AddRoleModal/AddRoleModal'
import ItemSection from 'components/ItemSection/ItemSection'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'

const Roles = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const requestRoleCallback = useCallback(() => dispatch(findRole(id)), [
    dispatch,
    id,
  ])
  const resetRoleCallback = useCallback(() => dispatch(resetRole()), [dispatch])

  useEffect(() => {
    requestRoleCallback()
    return () => resetRoleCallback()
  }, [requestRoleCallback, resetRoleCallback])
  const { role } = useSelector(({ roles: { role } }) => ({
    role,
  }))

  const handleEditClick = () => {
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleDuplicateClick = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  if (role && !Object.keys(role).length) return <Spinner></Spinner>
  return (
    <section className="rolePage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom3">
            <Box classes="bottom0_5">
              <Txt
                tag="span"
                size="14"
                semibold
                color="Grey"
                content="Role"
                uppercase
                space="2"
              />
            </Box>
            <Txt
              tag="h1"
              size="24"
              semibold
              color="DefaultCopy"
              content={role.name}
            />
            <Box classes="top2">
              <Hr color="GreyLightest"></Hr>
            </Box>
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
            <ItemSection heading="Role Details">
              <HList classes="3">
                <KeyValueItem property="Description" value={role.description} />
              </HList>
            </ItemSection>
          </VList>
        </Container>
      </Tier>
      <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddRoleModal
          isEdit={isEdit}
          defaultValues={role}
          setIsOpen={setIsOpen}
        ></AddRoleModal>
      </ModalContainer>
    </section>
  )
}

export default Roles
