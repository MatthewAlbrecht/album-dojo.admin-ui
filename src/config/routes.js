import Achievement from 'pages/Achievement/Achievement'
import Achievements from 'pages/Achievements/Achievements'
import Action from 'pages/Action/Action'
import Actions from 'pages/Actions/Actions'
import Albums from 'pages/Albums/Albums'
import Genre from 'pages/Genre/Genre'
import Genres from 'pages/Genres/Genres'
import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Permissions from 'pages/Permissions/Permissions'
import Permission from 'pages/Permission/Permission'
import Roles from 'pages/Roles/Roles'
import Role from 'pages/Role/Role'
import Spotify from 'pages/Spotify/Spotify'
import Users from 'pages/Users/Users'

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
    path: '/genres/:id',
    component: Genre,
    exact: true,
  },
  {
    path: '/roles',
    component: Roles,
    exact: true,
  },
  {
    path: '/roles/:id',
    component: Role,
    exact: true,
  },
  {
    path: '/permissions',
    component: Permissions,
    exact: true,
  },
  {
    path: '/permissions/:id',
    component: Permission,
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
