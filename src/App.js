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
  // async componentDidMount() {
  //   try {
  //     const REGISTER_URL = '/auth/profile/'
  //     const response = await axios.get(REGISTER_URL, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer eyJraWQiOiJjbU52ekJDRmlBc3ltbTV1cjRMVExFSklEM3VwSU13XC95M3U4ME9cL3pzVkU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4Y2JhZDI3Ni1iMGYwLTQxNTYtYjA4NC1kM2I4MTZjOTA4MzEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xXzhGbG9qODlsdCIsImNvZ25pdG86dXNlcm5hbWUiOiI4Y2JhZDI3Ni1iMGYwLTQxNTYtYjA4NC1kM2I4MTZjOTA4MzEiLCJvcmlnaW5fanRpIjoiMmFjYTEzMmQtNjY0ZS00MzM0LWI0NzQtZDYzYjFmNWUyNGQyIiwiYXVkIjoiM3RnNGMyN2Z0MGRhODIwaDkxOWcxcDM5NDMiLCJjdXN0b206bGFzdF9uYW1lIjoiSGEiLCJldmVudF9pZCI6IjM2NWJiZGZhLWU0MjMtNGMwNy05NGRhLTc3YzIwNWFhYjc1OCIsImN1c3RvbTpmaXJzdF9uYW1lIjoiTGluaEhSTSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQ4NjYyNTU2LCJleHAiOjE2NDg2NjYxNTYsImlhdCI6MTY0ODY2MjU1NiwianRpIjoiZWQ4NzE3NzktMmNjMS00YTIxLWIzMjgtZjBhNTNlN2QxNDk1IiwiZW1haWwiOiJsaW5oaGFocm1AbWFpbGluYXRvci5jb20ifQ.otfl4oWCv5Zk-NImsLvoegwm7W1Bm6mbfMOOlttTQ6xNZtA6kqb6F5i4jxuvSJwLcd03qzZJ_lKe6C75h0wNz7gOSi84ikuU9Og56b2vl8bAwSANHRhon5LgQzd1wDjB8rRN0G0l84_i_-h_pjA-BCgu8H64v5YD7cJXwVK67oBooVLFvnBgZzmWNidiinugtrMFNyKGx1MOZHdRWEY0PkhQ8mctzpHNkfzuP_5a0z4cW7ljilQI140W6dHM78UaoJANhiwS5DTwrkIAEVzG0Yl8b6D7p4VESFo4WspRbOgGvDb2zpt0UFW1u_Ef5QXUjE_3LKD4KKbtBSbtwDGzmQ`,
  //       },
  //       withCredentials: true,
  //       // mode: 'cors',
  //       // credentials: 'include',
  //     })
  //     if (response?.data.is_active == true) {
  //       alert('LOi')

  //     }
  //     console.log(response?.data.is_active)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
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
