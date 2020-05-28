import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addAlbumsByPlaylistId } from 'actions/spotify'
import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'
import TextInput from 'components/TextInput/TextInput'
import VList from 'components/VList/VList'
import Box from 'components/Box/Box'
import AlbumCardSimple from 'components/AlbumCardSimple/AlbumCardSimple'

export default function AddAlbumByPlaylist() {
  const dispatch = useDispatch()
  const {
    newAlbumsByPlaylist,
    newAlbumsByPlaylistError,
    newAlbumsByPlaylistLoading,
  } = useSelector(({ spotify }) => ({
    newAlbumsByPlaylist: spotify.newAlbumsByPlaylist,
    newAlbumsByPlaylistError: spotify.newAlbumsByPlaylistError,
    newAlbumsByPlaylistLoading: spotify.newAlbumsByPlaylistLoading,
  }))
  const handlePlaylistSubmit = event => {
    event.preventDefault()
    dispatch(addAlbumsByPlaylistId(event.target.playlistId.value))
  }

  return (
    <div className="addAlbumsByPlaylistSection">
      <form onSubmit={handlePlaylistSubmit} id="spotifyPlaylist-form">
        <Box classes="bottom3">
          <Txt
            tag="h2"
            size="18"
            semibold
            color="DefaultCopy"
            content="Add albums by Spotify playlist id"
          />
        </Box>
        {newAlbumsByPlaylistError && (
          <Box classes="bottom2">
            <Txt
              tag="p"
              size="14"
              color="RedDark"
              content={newAlbumsByPlaylistError}
            />
          </Box>
        )}
        <VList classes="2">
          <TextInput
            name="playlistId"
            label="Spotify Playlist URI"
            id="spotifyPlaylist-playlistId"
          />
          <Btn
            type="submit"
            form="spotifyPlaylist-form"
            content="Add Albums"
            loading={newAlbumsByPlaylistLoading}
            disabled={newAlbumsByPlaylistLoading}
          ></Btn>
        </VList>
        {newAlbumsByPlaylist && (
          <Box classes="top3">
            <VList classes="2">
              {newAlbumsByPlaylist.map(album => (
                <AlbumCardSimple key={album.id} album={album} />
              ))}
            </VList>
          </Box>
        )}
      </form>
    </div>
  )
}
