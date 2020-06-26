import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findPermission, resetPermission } from 'state/actions/permissions'
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
import AddPermissionModal from 'components/AddPermissionModal/AddPermissionModal'
import ItemSection from 'components/ItemSection/ItemSection'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'
import RoleCheckboxGroup from 'components/RoleCheckboxGroup/RoleCheckboxGroup'

const Permissions = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const requestPermissionCallback = useCallback(
    () => dispatch(findPermission(id)),
    [dispatch, id]
  )
  const resetPermissionCallback = useCallback(
    () => dispatch(resetPermission()),
    [dispatch]
  )

  useEffect(() => {
    requestPermissionCallback()
    return () => resetPermissionCallback()
  }, [requestPermissionCallback, resetPermissionCallback])
  const { permission } = useSelector(({ permissions: { permission } }) => ({
    permission,
  }))

  const handleEditClick = () => {
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleDuplicateClick = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  if (permission && !Object.keys(permission).length) return <Spinner></Spinner>
  return (
    <section className="permissionPage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom3">
            <Box classes="bottom0_5">
              <Txt
                tag="span"
                size="14"
                semibold
                color="Grey"
                content="Permission"
                uppercase
                space="2"
              />
            </Box>
            <Txt
              tag="h1"
              size="24"
              semibold
              color="DefaultCopy"
              content={permission.name}
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
            <ItemSection heading="Permission Details">
              <HList classes="3">
                <KeyValueItem
                  property="Description"
                  value={permission.description}
                />
              </HList>
            </ItemSection>
            <ItemSection heading="Roles">
              <RoleCheckboxGroup
                roles={
                  permission.roles &&
                  permission.roles.map(role => role.id).sort()
                }
                id={permission.id}
              ></RoleCheckboxGroup>
            </ItemSection>
          </VList>
        </Container>
      </Tier>
      <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddPermissionModal
          isEdit={isEdit}
          defaultValues={permission}
          setIsOpen={setIsOpen}
        ></AddPermissionModal>
      </ModalContainer>
    </section>
  )
}

export default Permissions
