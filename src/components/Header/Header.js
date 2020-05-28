import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logoutUser } from 'actions/session'

import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'

const Header = ({ token, logoutUser, history }) => {
  const handleLogoutClick = () => {
    logoutUser()
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

const mapStateToProps = ({ session }) => ({
  token: session.token,
})

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
