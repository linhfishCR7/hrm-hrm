import axios from './axios'

const GetProfile = async () => {
  const token = localStorage.getItem('token')
  const REGISTER_URL = '/auth/profile/'
  return await axios.get(REGISTER_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
}
export default GetProfile
