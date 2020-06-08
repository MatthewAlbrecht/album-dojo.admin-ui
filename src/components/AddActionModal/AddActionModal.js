import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createAction } from 'state/actions/actions'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddActionModal({ setIsOpen }) {
  const dispatch = useDispatch()
  const { createActionLoading } = useSelector(state => state.actions)
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
    dispatch(createAction(action, () => setIsOpen(false)))
  }

  return (
    <div className="addAction">
      <Txt tag="h2" size="20" color="DefaultCopy" content="Create New Action" />
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
            />
            <TextInput name="name" label="Name" id="action-name" required />
            <TextBox
              name="description"
              label="Description"
              className="addAction-descriptionInput"
              id="action-description"
              rows={5}
              cols={33}
              col={1}
              colSpan={2}
            />
            <TextInput
              type="number"
              name="level"
              label="Level"
              defaultValue={1}
              id="action-level"
              required
            />
            <TextInput
              name="points"
              label="Points"
              id="action-points"
              type="number"
              defaultValue="10"
              required
            />
            <TextInput
              name="achievementCode"
              label="Related Achievement Code"
              id="action-achievementCode"
              placeholder="XX001"
              pattern="[A-Z]{2}\d{3}"
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
