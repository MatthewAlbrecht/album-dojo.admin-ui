import {
  SET_CURRENT_USER,
  SET_TOKEN,
  LOGIN_ERROR,
  LOGIN_LOADING,
  SET_SPOTIFY_TOKEN,
  LOGOUT_USER,
} from '../types/actions'
import qs from 'query-string'
import { request } from 'graphql-request'
import { loginUserMutation } from '../gql'

export const loginUser = data => async dispatch => {
  console.log('HERE')
  dispatch({
    type: LOGIN_LOADING,
    payload: true,
  })
  request('http://localhost:2017/graphql', loginUserMutation, {
    user: data,
  })
    .then(({ loginUser: user }) => {
      console.log('response ==='.toUpperCase(), user)
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      })
      dispatch({
        type: SET_TOKEN,
        payload: user.token,
      })
      dispatch({
        type: LOGIN_LOADING,
        payload: false,
      })
    })
    .catch(err => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err,
      })
      dispatch({
        type: LOGIN_LOADING,
        payload: false,
      })
    })
}

export const spotifyLogin = code => async dispatch => {
  console.log('HERE')
  fetch(`http://localhost:2017/api/spotifyLogin?${qs.stringify({ code })}`, {
    method: 'POST',
  })
    .then(res => res.json())
    .then(({ applicationAccessToken, spotifyAccessToken, user }) => {
      console.log(
        'user, applicationAccessToken, spotifyAccessToken ==='.toUpperCase(),
        user,
        applicationAccessToken,
        spotifyAccessToken
      )
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      })
      dispatch({
        type: SET_TOKEN,
        payload: applicationAccessToken,
      })
      dispatch({
        type: SET_SPOTIFY_TOKEN,
        payload: spotifyAccessToken,
      })
    })
    .catch(err => {
      console.log('err ==='.toUpperCase(), err)
    })
}

export const spotifyConnect = code => async (dispatch, getState) => {
  fetch(`http://localhost:2017/api/spotifyConnect?${qs.stringify({ code })}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getState().session.token}`,
    },
  })
    .then(res => res.json())
    .then(({ applicationAccessToken, spotifyAccessToken, user }) => {
      console.log(
        'user, applicationAccessToken, spotifyAccessToken ==='.toUpperCase(),
        user,
        applicationAccessToken,
        spotifyAccessToken
      )
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      })
      dispatch({
        type: SET_TOKEN,
        payload: applicationAccessToken,
      })
      dispatch({
        type: SET_SPOTIFY_TOKEN,
        payload: spotifyAccessToken,
      })
    })
    .catch(err => {
      console.log('err ==='.toUpperCase(), err)
    })
}

export const spotifyRefresh = () => async (dispatch, getState) => {
  console.log('HERE', getState().session.token)
  const state = getState()
  const body = {
    spotifyAccessToken: state.session.spotifyAccessToken,
    userId: state.session.currentUser.id,
  }
  fetch(`http://localhost:2017/api/spotifyRefresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getState().session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(({ applicationAccessToken, spotifyAccessToken }) => {
      dispatch({
        type: SET_TOKEN,
        payload: applicationAccessToken,
      })
      dispatch({
        type: SET_SPOTIFY_TOKEN,
        payload: spotifyAccessToken,
      })
    })
    .catch(err => {
      console.log('err ==='.toUpperCase(), err)
    })
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER,
  })
  localStorage.removeItem('state')
}
