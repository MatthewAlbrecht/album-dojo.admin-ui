import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createUser } from 'state/actions/users'
import Txt from 'components/Txt/Txt'
import TextInput from 'components/TextInput/TextInput'
import Box from 'components/Box/Box'
import Btn from 'components/Btn/Btn'

export default function AddUserModal({ setIsOpen }) {
  const dispatch = useDispatch()
  const { createUserLoading } = useSelector(state => state.users)
  function handleAddUserSubmit(e) {
    e.preventDefault()
    const user = {
      username: e.target.username.value,
      email: e.target.email.value || null,
      password: e.target.password.value || null,
      password2: e.target.password2.value || null,
    }
    console.log('user ==='.toUpperCase(), user)
    dispatch(createUser(user, () => setIsOpen(false)))
  }

  return (
    <div className="addUser">
      <Txt tag="h2" size="20" color="DefaultCopy" content="Create New User" />
      <Box classes="top3">
        <form
          onSubmit={handleAddUserSubmit}
          id="addUser-form"
          className="addUser-form"
        >
          <div className="display_grid grid--col2 grid--gap2">
            <TextInput
              name="username"
              label="Username"
              id="user-username"
              required
            />
            <TextInput
              name="email"
              label="Email"
              type="email"
              id="user-email"
              required
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              id="user-password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              required
            />
            <TextInput
              name="password2"
              label="Confirm Password"
              type="password"
              id="user-password2"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              required
            />
          </div>
          <div className="display_flex flexJustifier_flexEnd">
            <Box classes="top4">
              <Btn
                type="submit"
                form="addUser-form"
                content="Submit"
                loading={createUserLoading}
                disabled={createUserLoading}
              ></Btn>
            </Box>
          </div>
        </form>
      </Box>
    </div>
  )
}
