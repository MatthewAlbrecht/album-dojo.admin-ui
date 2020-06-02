import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'query-string'
import OauthPopup from 'react-oauth-popup'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'

import { SPOTIFY_QS } from 'utils/constants'
import { loginUser, spotifyLogin } from 'actions/session'
import Btn from 'components/Btn/Btn'
import Tier from 'components/Tier/Tier'
import Container from 'components/Container/Container'
import VList from 'components/VList/VList'
import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'

const Home = props => {
  const dispatch = useDispatch()
  const token = useSelector(({ session }) => session.token)

  const onLoginFormSubmit = event => {
    event.preventDefault()
    dispatch(
      loginUser({
        email: event.target.email.value,
        password: event.target.password.value,
      })
    )
  }

  const handleSpotifyLogin = code => {
    dispatch(spotifyLogin(code))
  }

  if (token) {
    return <Redirect to="/"></Redirect>
  }

  return (
    <div className="loginPage">
      <Container>
        <Tier classes="underNav">
          <div className="loginOptions">
            <OauthPopup
              url={`https://accounts.spotify.com/authorize?${qs.stringify(
                SPOTIFY_QS
              )}`}
              onCode={handleSpotifyLogin}
            >
              <Btn pill content="Login with Spotify"></Btn>
            </OauthPopup>
            <Box classes="flats3">
              <Txt tag="h3" size="16" color="DefaultCopy" content="- OR -" />
            </Box>
            <form onSubmit={onLoginFormSubmit} id="login-form">
              <VList classes="2">
                <TextInput name="email" label="Email" id="login-email" />
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  id="login-password"
                />
                <Btn type="submit" form="login-form" content="Login"></Btn>
              </VList>
            </form>
          </div>
        </Tier>
      </Container>
    </div>
  )
}

export default withRouter(Home)
