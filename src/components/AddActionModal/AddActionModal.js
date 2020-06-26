import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createAction, updateAction } from 'state/actions/actions'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddActionModal({
  setIsOpen,
  defaultValues = {},
  isEdit,
}) {
  const dispatch = useDispatch()
  const { createActionLoading } = useSelector(state => state.actions)
  const headerContent = isEdit ? 'Edit Action' : 'Create New Action'

  function handleAddActionSubmit(e) {
    e.preventDefault()
    const action = {
      code: e.target.code.value,
      name: e.target.name.value,
      description: e.target.description.value || null,
      level: +e.target.level.value || null,
      points: +e.target.points.value || null,
      achievementCode: e.target.achievementCode.value || null,
    }
    console.log('action ==='.toUpperCase(), action)
    if (isEdit) {
      dispatch(updateAction(action.code, action, () => setIsOpen(false)))
    } else {
      dispatch(createAction(action, () => setIsOpen(false)))
    }
  }

  return (
    <div className="addAction">
      <Txt tag="h2" size="20" color="DefaultCopy" content={headerContent} />
      <Box classes="top3">
        <form
          onSubmit={handleAddActionSubmit}
          id="addAction-form"
          className="addAction-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput
              name="code"
              label="Code"
              placeholder="XX001"
              id="action-code"
              required
              pattern="[A-Z]{2}\d{3}"
              defaultValue={defaultValues.code}
            />
            <TextInput
              name="name"
              label="Name"
              id="action-name"
              required
              defaultValue={defaultValues.name}
            />
            <TextBox
              name="description"
              label="Description"
              className="addAction-descriptionInput"
              id="action-description"
              rows={5}
              cols={33}
              col={1}
              colSpan={2}
              defaultValue={defaultValues.description}
            />
            <TextInput
              type="number"
              name="level"
              label="Level"
              id="action-level"
              required
              defaultValue={defaultValues.level}
            />
            <TextInput
              name="points"
              label="Points"
              id="action-points"
              type="number"
              required
              defaultValue={defaultValues.points}
            />
            <TextInput
              name="achievementCode"
              label="Related Achievement Code"
              id="action-achievementCode"
              placeholder="XX001"
              pattern="[A-Z]{2}\d{3}"
              defaultValue={defaultValues.achievementCode}
            />
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addAction-form"
                content="Submit"
                loading={createActionLoading}
                disabled={createActionLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
