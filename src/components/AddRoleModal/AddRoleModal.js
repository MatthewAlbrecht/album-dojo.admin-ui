import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createRole } from 'state/actions/roles'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddRoleModal({ setIsOpen }) {
  const dispatch = useDispatch()
  const { createRoleLoading } = useSelector(state => state.roles)
  function handleAddRoleSubmit(e) {
    e.preventDefault()
    const role = {
      name: e.target.name.value,
      description: e.target.description.value || null,
    }
    console.log('role ==='.toUpperCase(), role)
    dispatch(createRole(role, () => setIsOpen(false)))
  }

  return (
    <div className="addRole">
      <Txt tag="h2" size="20" color="DefaultCopy" content="Create New Role" />
      <Box classes="top3">
        <form
          onSubmit={handleAddRoleSubmit}
          id="addRole-form"
          className="addRole-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput name="name" label="Name" id="role-name" required />
            <TextBox
              name="description"
              label="Description"
              className="addRole-descriptionInput"
              id="role-description"
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
                form="addRole-form"
                content="Submit"
                loading={createRoleLoading}
                disabled={createRoleLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
