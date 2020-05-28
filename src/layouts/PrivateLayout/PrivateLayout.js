import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from 'components/Shelf/Shelf'

export default function PrivateLayout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <>
          <Shelf></Shelf>
          <div className="view">
            <Component {...matchProps} />
          </div>
        </>
      )}
    />
  )
}
