import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Spotify from 'pages/Spotify/Spotify'
import Albums from 'pages/Albums/Albums'

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
]

export const privateRoutes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/spotify',
    component: Spotify,
    exact: true,
  },
  {
    path: '/albums',
    component: Albums,
    exact: true,
  },
]
