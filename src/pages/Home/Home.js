import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Btn from 'components/Btn/Btn'
import Tier from 'components/Tier/Tier'
import Container from 'components/Container/Container'

const LEVEL_DATA = gql`
  query {
    user {
      id
      points
    }
  }
`

const LOGIN = gql`
  mutation loginUser($user: UserInputTypeLogin!) {
    loginUser(user: $user) {
      id
      username
      email
      role
      token
    }
  }
`

const SIGNUP = gql`
  mutation createUser($user: UserInputTypeCreate!) {
    createUser(user: $user) {
      id
      username
      email
      role
      token
    }
  }
`

const Home = () => {
  const client = useApolloClient()
  const [
    login,
    {
      data: dataLogin,
      loading: loadingLogin,
      error: errorLogin,
      called: calledLogin,
    },
  ] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: error => {
      console.log(error)
    },
    onCompleted: ({ loginUser }) => {
      console.log('loginUser ==='.toUpperCase(), loginUser)
      localStorage.setItem('token', loginUser.token)
      client.writeData({ data: { isLoggedIn: true, currentUser: loginUser } })
    },
  })

  const [
    signup,
    {
      data: dataSignup,
      loading: loadingSignup,
      error: errorSignup,
      called: calledSignup,
    },
  ] = useMutation(SIGNUP, {
    errorPolicy: 'all',
    onError: error => {
      console.log(error)
    },
  })

  const onLoginFormSubmit = event => {
    event.preventDefault()
    login({
      variables: {
        user: {
          email: event.target.email.value,
          password: event.target.password.value,
        },
      },
    })
  }

  const onSignupFormSubmit = event => {
    event.preventDefault()
    signup({
      variables: {
        user: {
          email: event.target.email.value,
          password: event.target.password.value,
          password2: event.target.password2.value,
          username: event.target.username.value,
        },
      },
    })
  }

  return (
    <Container>
      <h1>Home Page</h1>
      <h2>This is where login information will go</h2>
      {dataLogin && <UserData id={dataLogin.loginUser.id}></UserData>}
      {/* {loadingUser && <p>Loading...</p>}
      {errorUser && <p>Error :/</p>}
      {dataUser && (
        <div>
          <h1>you are level {dataUser.user[0].points.currentLevel}</h1>
          <h3>
            you have a total of {dataUser.user[0].points.totalUserPoints} points
          </h3>
          <h3>
            you need {dataUser.user[0].points.pointsToNextLevel} more points to
            level up
          </h3>
        </div>
      )} */}

      <Tier>
        <div className="login">
          {!calledLogin && <h3>login hasn't been called</h3>}
          {loadingLogin && <h3>LOADING...</h3>}
          {errorLogin && <h3>ERROR: {JSON.stringify(errorLogin, null, 2)}</h3>}
          {dataLogin && <h3>DATA: {JSON.stringify(dataLogin)}</h3>}
          <form onSubmit={onLoginFormSubmit}>
            <label className="box">
              email
              <input name="email"></input>
            </label>
            <label className="box">
              password
              <input name="password"></input>
            </label>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </Tier>
      <Tier>
        <div className="signup">
          {!calledSignup && <h3>signup hasn't been called</h3>}
          {loadingSignup && <h3>LOADING...</h3>}
          {errorSignup && (
            <h3>ERROR: {JSON.stringify(errorSignup, null, 2)}</h3>
          )}
          {dataSignup && <h3>DATA: {JSON.stringify(dataSignup)}</h3>}
          <form onSubmit={onSignupFormSubmit}>
            <label className="box">
              username
              <input name="username"></input>
            </label>
            <label className="box">
              email
              <input name="email"></input>
            </label>
            <label className="box">
              password
              <input name="password"></input>
            </label>
            <label className="box">
              retype password
              <input name="password2"></input>
            </label>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </Tier>
      <div className="spotify">
        <Btn pill content="Login/Signup with Spotify"></Btn>
        <Btn pill content="Connect Spotify Account"></Btn>
      </div>
    </Container>
  )
}

export default Home

const UserData = ({ id }) => {
  const client = useApolloClient()
  const USER = gql`
    query {
      currentUser {
        id
        username
        points
      }
    }
  `
  const user = client.readQuery({ query: USER })
  console.log('user ==='.toUpperCase(), user)
  // const { loading, error, data } = useQuery(USER, { variables: { id } })

  return (
    <div>
      {id}
      {/* {loading && <h2>authenticated user data loading</h2>}
      {error && <h2>error retrieving data</h2>}
      {data && <h1>{JSON.stringify(data)}</h1>} */}
    </div>
  )
}
