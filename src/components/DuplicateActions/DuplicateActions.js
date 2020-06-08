import React from 'react'
import { useDispatch } from 'react-redux'

import { resetDuplicateProperties, updateAlbum } from 'state/actions/albums'
import Btn from 'components/Btn/Btn'
import Box from 'components/Box/Box'

export default function DuplicateActions({
  updateAlbumLoading,
  duplicates,
  primaryDuplicate,
}) {
  const dispatch = useDispatch()
  return (
    <div className="duplicateActions">
      <Btn
        content="Submit"
        classes="small"
        shadow
        disabled={updateAlbumLoading}
        onClick={() =>
          dispatch(
            updateAlbum(primaryDuplicate, { duplicates }, () =>
              dispatch(resetDuplicateProperties(true))
            )
          )
        }
      ></Btn>
      <Box classes="top2">
        <Btn
          content="Cancel"
          classes="small"
          secondary
          shadow
          onClick={() => dispatch(resetDuplicateProperties())}
        ></Btn>
      </Box>
    </div>
  )
}
