import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'query-string'
import OauthPopup from 'react-oauth-popup'

import { SPOTIFY_QS } from 'utils/constants'
import { spotifyConnect } from 'actions/session'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'
import AddAlbumById from 'components/AddAlbumById/AddAlbumById'
import AddAlbumsByPlaylist from 'components/AddAlbumsByPlaylist/AddAlbumsByPlaylist'
import Box from 'components/Box/Box'
import Hr from 'components/Hr/Hr'

const Spotify = () => {
  const dispatch = useDispatch()
  const { spotifyAccessToken } = useSelector(({ session, albums }) => ({
    spotifyAccessToken: session.spotifyAccessToken,
  }))
  return (
    <>
      <Container>
        <Tier classes="underNav">
          <Box classes="bottom6">
            <Txt
              tag="h1"
              size="24"
              bold
              color="DefaultCopy"
              content="Spotify Syncing"
            />
          </Box>
          {!spotifyAccessToken && (
            <Box classes="bottom4">
              <OauthPopup
                url={`https://accounts.spotify.com/authorize?${qs.stringify(
                  SPOTIFY_QS
                )}`}
                onCode={code => dispatch(spotifyConnect(code))}
              >
                <Btn pill content="Connect Spotify Account"></Btn>
              </OauthPopup>
            </Box>
          )}
          <AddAlbumById />
          <Box classes="flats4">
            <Hr size="1" color="GreyLightest" />
          </Box>
          <AddAlbumsByPlaylist />
        </Tier>
      </Container>
    </>
  )
}

export default Spotify
