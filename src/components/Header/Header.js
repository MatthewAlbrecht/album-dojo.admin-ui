import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { logoutUser } from 'state/actions/session'

import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'

const Header = ({ history }) => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.session)

  const handleLogoutClick = () => {
    dispatch(logoutUser())
    history.push('/login')
  }
  return (
    <header className="header">
      <div className="header-content">
        <Txt
          tag="h1"
          size="20"
          color="Lightest"
          space="1"
          content="Album Dojo | Admin Portal"
        ></Txt>
        {token && (
          <Btn content="Logout" secondary onClick={handleLogoutClick}></Btn>
        )}
      </div>
    </header>
  )
}

export default withRouter(Header)
