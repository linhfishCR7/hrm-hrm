import axios from './axios'
// import { useNavigate } from 'react-router-dom'

const GetProfile = async () => {
  // let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const REGISTER_URL = `/auth/profile/`
  return await axios.get(REGISTER_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
export default GetProfile
