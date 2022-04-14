import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import axios from './utils/axios'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ForgotPassword = React.lazy(() => import('./views/pages/forgotPassword/ForgotPassword'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/ChangePassword'))
const ChangeEmail = React.lazy(() => import('./views/pages/changeEmail/ChangeEmail'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/change-email" name="Change Email Page" element={<ChangeEmail />} />
            <Route
              exact
              path="/change-password"
              name="Change Password Page"
              element={<ChangePassword />}
            />
            <Route
              exact
              path="/forgot-password"
              name="forgot password Page"
              element={<ForgotPassword />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
