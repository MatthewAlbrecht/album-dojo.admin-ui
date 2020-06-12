import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createAchievement,
  updateAchievement,
} from 'state/actions/achievements'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddAchievementModal({
  setIsOpen,
  defaultValues = {},
  isEdit,
}) {
  const dispatch = useDispatch()
  const { createAchievementLoading } = useSelector(state => state.achievements)
  const headerContent = isEdit ? 'Edit Achievement' : 'Create New Achievement'

  function handleAddAchievementSubmit(e) {
    e.preventDefault()
    const achievement = {
      code: e.target.code.value,
      name: e.target.name.value,
      description: e.target.description.value || null,
      level: +e.target.level.value || null,
      imageUrl: e.target.imageUrl.value || null,
    }
    console.log('achievement ==='.toUpperCase(), achievement)
    console.log('achievement.code ==='.toUpperCase(), achievement.code)
    if (isEdit) {
      dispatch(
        updateAchievement(achievement.code, achievement, () => setIsOpen(false))
      )
    } else {
      dispatch(createAchievement(achievement, () => setIsOpen(false)))
    }
  }

  return (
    <div className="addAchievement">
      <Txt tag="h2" size="20" color="DefaultCopy" content={headerContent} />
      <Box classes="top3">
        <form
          onSubmit={handleAddAchievementSubmit}
          id="addAchievement-form"
          className="addAchievement-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput
              name="code"
              label="Code"
              placeholder="XX001"
              id="achievement-code"
              defaultValue={defaultValues.code}
              required
              pattern="[A-Z]{2}\d{3}"
            />
            <TextInput
              name="name"
              label="Name"
              id="achievement-name"
              defaultValue={defaultValues.name}
              required
            />
            <TextBox
              name="description"
              label="Description"
              className="addAchievement-descriptionInput"
              id="achievement-description"
              defaultValue={defaultValues.description}
              rows={5}
              cols={33}
              col={1}
              colSpan={2}
            />
            <TextInput
              type="number"
              name="level"
              label="Level"
              id="achievement-level"
              defaultValue={defaultValues.level}
              required
            />
            <TextInput
              name="imageUrl"
              label="Image URL"
              id="achievement-imageUrl"
              defaultValue={defaultValues.imageUrl}
            />
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addAchievement-form"
                content="Submit"
                loading={createAchievementLoading}
                disabled={createAchievementLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
