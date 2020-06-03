import React from 'react'
import Info from './Icons/Info'
import Search from './Icons/Search'
import Spotify from './Icons/Spotify'
import EllipsisV from './Icons/EllipsisV'
import classnames from 'classnames'

export default function Icon({ className, type, classes }) {
  function getClasses() {
    return classes && classes.split(' ').map(imgClass => `icon_${imgClass}`)
  }

  const iconMap = {
    Info: <Info />,
    Search: <Search />,
    Spotify: <Spotify />,
    EllipsisV: <EllipsisV />,
  }

  function getClassName() {
    return classnames('icon', className, getClasses())
  }

  return <i className={getClassName()}>{iconMap[type]}</i>
}
