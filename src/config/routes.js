import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Spotify from 'pages/Spotify/Spotify'
import Albums from 'pages/Albums/Albums'
import Users from 'pages/Users/Users'
import Genres from 'pages/Genres/Genres'
import Roles from 'pages/Roles/Roles'
import Permissions from 'pages/Permissions/Permissions'
import Achievements from 'pages/Achievements/Achievements'
import Achievement from 'pages/Achievement/Achievement'
import Actions from 'pages/Actions/Actions'
import Action from 'pages/Action/Action'

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
  {
    path: '/users',
    component: Users,
    exact: true,
  },
  {
    path: '/genres',
    component: Genres,
    exact: true,
  },
  {
    path: '/roles',
    component: Roles,
    exact: true,
  },
  {
    path: '/permissions',
    component: Permissions,
    exact: true,
  },
  {
    path: '/achievements',
    component: Achievements,
    exact: true,
  },
  {
    path: '/achievements/:code',
    component: Achievement,
    exact: true,
  },
  {
    path: '/actions',
    component: Actions,
    exact: true,
  },
  {
    path: '/actions/:code',
    component: Action,
    exact: true,
  },
]
