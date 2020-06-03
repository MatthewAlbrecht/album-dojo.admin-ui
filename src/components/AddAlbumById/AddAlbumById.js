import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addAlbumBySpotifyId } from 'state/actions/spotify'
import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'
import TextInput from 'components/TextInput/TextInput'
import VList from 'components/VList/VList'
import Box from 'components/Box/Box'
import AlbumCardSimple from 'components/AlbumCardSimple/AlbumCardSimple'

export default function AddAlbumById() {
  const dispatch = useDispatch()
  const { newAlbumById, newAlbumByIdError, newAlbumByIdLoading } = useSelector(
    ({ spotify }) => ({
      newAlbumById: spotify.newAlbumById,
      newAlbumByIdError: spotify.newAlbumByIdError,
      newAlbumByIdLoading: spotify.newAlbumByIdLoading,
    })
  )
  const handleAlbumSubmit = event => {
    event.preventDefault()
    dispatch(addAlbumBySpotifyId(event.target.albumId.value))
  }

  return (
    <div className="addAlbumByIdSection">
      <form onSubmit={handleAlbumSubmit} id="spotifyAlbum-form">
        <Box classes="bottom3">
          <Txt
            tag="h2"
            size="18"
            semibold
            color="DefaultCopy"
            content="Add album by Spotify id"
          />
        </Box>
        {newAlbumByIdError && (
          <Box classes="bottom2">
            <Txt
              tag="p"
              size="14"
              color="RedDark"
              content={newAlbumByIdError}
            />
          </Box>
        )}
        <VList classes="2">
          <TextInput
            name="albumId"
            label="Spotify Album URI"
            id="spotifyAlbum-albumId"
          />
          <Btn
            type="submit"
            form="spotifyAlbum-form"
            content="Add Album"
            loading={newAlbumByIdLoading}
            disabled={newAlbumByIdLoading}
          ></Btn>
        </VList>
      </form>
      {newAlbumById && (
        <Box classes="top3">
          <AlbumCardSimple album={newAlbumById} />
        </Box>
      )}
    </div>
  )
}
