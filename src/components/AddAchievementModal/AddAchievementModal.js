import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createAchievement } from 'state/actions/achievements'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import TextBox from 'components/TextBox/TextBox'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddAchievementModal({ setIsOpen }) {
  const dispatch = useDispatch()
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
    dispatch(createAchievement(achievement, () => setIsOpen(false)))
  }

  return (
    <div className="addAchievement">
      <Txt
        tag="h2"
        size="20"
        color="DefaultCopy"
        content="Create New Achievement"
      />
      <Box classes="top3">
        <form
          onSubmit={handleAddAchievementSubmit}
          id="addAchievement-form"
          className="addAchievement-form"
        >
          <div className="addAchievement-formFields">
            <TextInput
              name="code"
              label="Code"
              placeholder="XX001"
              id="achievement-code"
              required
              pattern="[A-Z]{2}\d{3}"
            />
            <TextInput
              name="name"
              label="Name"
              id="achievement-name"
              required
            />
            <TextBox
              name="description"
              label="Description"
              className="addAchievement-descriptionInput"
              id="achievement-description"
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
              id="achievement-level"
              required
            />
            <TextInput
              name="imageUrl"
              label="Image URL"
              id="achievement-imageUrl"
            />
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addAchievement-form"
                content="Submit"
                // loading={newAlbumsByPlaylistLoading}
                // disabled={newAlbumsByPlaylistLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
