import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPermission } from 'state/actions/permissions'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddPermissionModal({ setIsOpen }) {
  const dispatch = useDispatch()
  const { createPermissionLoading } = useSelector(state => state.permissions)
  function handleAddPermissionSubmit(e) {
    e.preventDefault()
    const permission = {
      name: e.target.name.value,
      description: e.target.description.value || null,
    }
    console.log('permission ==='.toUpperCase(), permission)
    dispatch(createPermission(permission, () => setIsOpen(false)))
  }

  return (
    <div className="addPermission">
      <Txt
        tag="h2"
        size="20"
        color="DefaultCopy"
        content="Create New Permission"
      />
      <Box classes="top3">
        <form
          onSubmit={handleAddPermissionSubmit}
          id="addPermission-form"
          className="addPermission-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput name="name" label="Name" id="permission-name" required />
            <TextBox
              name="description"
              label="Description"
              className="addPermission-descriptionInput"
              id="permission-description"
              placeholder="User is allowed to..."
              rows={5}
              cols={33}
              col={1}
              colSpan={2}
            />
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addPermission-form"
                content="Submit"
                loading={createPermissionLoading}
                disabled={createPermissionLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
