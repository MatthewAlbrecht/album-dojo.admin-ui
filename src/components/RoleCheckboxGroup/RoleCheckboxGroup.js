import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRoles } from 'state/actions/roles'
import { updatePermission } from 'state/actions/permissions'
import CheckboxGroup from 'components/CheckboxGroup/CheckboxGroup'
import Btn from 'components/Btn/Btn'
import Box from 'components/Box/Box'

export default function RoleCheckboxGroup({ roles = [], id }) {
  const [activeRoles, setActiveRoles] = useState(roles)
  const dispatch = useDispatch()
  const { roleOptions = [] } = useSelector(({ roles: { roleOptions } }) => ({
    roleOptions,
  }))
  const requestRolesCallback = useCallback(() => dispatch(getAllRoles()), [
    dispatch,
  ])

  useEffect(() => {
    if (!roleOptions.length) {
      requestRolesCallback()
    }
  }, [requestRolesCallback, roleOptions.length])

  const isArrayEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false

    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) return false
    }

    return true
  }

  const handleCheckboxChange = ({ target: { value } }) => {
    let newActiveRoles = [...activeRoles]
    if (activeRoles.includes(value)) {
      const index = activeRoles.indexOf(value)
      newActiveRoles.splice(index, 1)
    } else {
      newActiveRoles.push(value)
      newActiveRoles.sort()
    }
    setActiveRoles(newActiveRoles)
  }

  const handleRoleSave = () => {
    dispatch(updatePermission(id, { roles: activeRoles }))
  }

  return (
    <div>
      <CheckboxGroup
        name="roles"
        options={roleOptions}
        defaultValue={[]}
        numOfCol={3}
        handleChange={handleCheckboxChange}
        value={activeRoles}
      ></CheckboxGroup>
      <Box classes="top1">
        <div className="display_flex flexDirection_row flexJustifier_flexEnd">
          <Btn
            content="Submit"
            classes="small"
            disabled={isArrayEqual(activeRoles, roles)}
            onClick={handleRoleSave}
          ></Btn>
        </div>
      </Box>
    </div>
  )
}
