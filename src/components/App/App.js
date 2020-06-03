import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { publicRoutes, privateRoutes } from 'config/routes'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import TabListener from 'components/TabListener/TabListener'
import ScrollToTop from 'components/ScrollToTop/ScrollToTop'
import PrivateLayout from 'Layouts/PrivateLayout/PrivateLayout'

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
          {privateRoutes.map((route, index) => (
            <ProtectedRoute
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </main>
        <Footer />
        <TabListener />
        <ScrollToTop />
      </div>
    </Router>
  )
}

let ProtectedRoute = ({ token, index, exact, path, component }) => {
  return token ? (
    <PrivateLayout
      key={index}
      exact={exact}
      path={path}
      component={component}
    />
  ) : (
    <Redirect to="/login"></Redirect>
  )
}

const mapStateToProps = ({ session }) => ({
  token: session.token,
})

ProtectedRoute = connect(mapStateToProps)(ProtectedRoute)
